const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Important for parsing JSON requests

const DATA_FILE_USER = path.join(__dirname, 'data/users.json');
const DATA_FILE = path.join(__dirname, 'data/contacts.json');

// Helper to ensure directory exists for user data
const ensureDirectoryExists_user = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Helper to ensure directory exists for contacts data
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Ensure the `data` directory exists for user and contact data
ensureDirectoryExists_user(path.dirname(DATA_FILE_USER));
ensureDirectoryExists(path.dirname(DATA_FILE));

// Signup endpoint
// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Missing required fields');
    }

    const newUser = { name, email, password };

    fs.readFile(DATA_FILE_USER, (err, data) => {
        const users = err ? [] : JSON.parse(data);

        const userExists = users.some((user) => user.email === email);
        if (userExists) {
            return res.status(400).send('Email already registered');
        }

        users.push(newUser);
        fs.writeFile(DATA_FILE_USER, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error writing data');
            }
            // Send back the new user data after successful registration
            res.status(201).json(newUser);
        });
    });
});


// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Missing required fields');
    }

    fs.readFile(DATA_FILE_USER, (err, data) => {
        const users = err ? [] : JSON.parse(data);
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        res.json({ name: user.name, email: user.email });
    });
});

// Endpoint to save data
app.post('/submit', (req, res) => {
    const userData = req.body;

    if (!userData || !userData.name || !userData.email || !userData.message) {
        return res.status(400).send('Invalid data');
    }

    fs.stat(DATA_FILE, (err, stats) => {
        if (err && err.code === 'ENOENT') {
            return fs.writeFile(DATA_FILE, JSON.stringify([userData], null, 2), (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                    return res.status(500).send('Internal server error');
                }
                return res.status(201).send('Data saved successfully');
            });
        }

        if (stats.size >= 5 * 1024 * 1024) {
            return res.status(400).send('File size limit reached');
        }

        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Internal server error');
            }

            let users = [];
            try {
                users = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return res.status(500).send('Internal server error');
            }

            users.push(userData);

            fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return res.status(500).send('Internal server error');
                }
                res.status(201).send('Data saved successfully');
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
