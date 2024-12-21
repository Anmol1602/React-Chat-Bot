const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5001;
const DATA_FILE = path.join(__dirname, 'data/users.json');

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Important for parsing JSON requests

// Helper to ensure directory exists
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Ensure the `data` directory exists
ensureDirectoryExists(path.dirname(DATA_FILE));

// Endpoint to save data
app.post('/submit', (req, res) => {
    const userData = req.body;

    // Validate the incoming data
    if (!userData || !userData.name || !userData.email || !userData.message) {
        return res.status(400).send('Invalid data');
    }

    fs.stat(DATA_FILE, (err, stats) => {
        if (err && err.code === 'ENOENT') {
            // If file doesn't exist, create it with an initial array
            return fs.writeFile(DATA_FILE, JSON.stringify([userData], null, 2), (err) => {
                if (err) {
                    console.error('Error creating file:', err);
                    return res.status(500).send('Internal server error');
                }
                return res.status(201).send('Data saved successfully');
            });
        }

        if (stats.size >= 5 * 1024 * 1024) {
            // If file is 5MB or larger, reject the request
            return res.status(400).send('File size limit reached');
        }

        // Append data to the existing file
        fs.readFile(DATA_FILE, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Internal server error');
            }

            let users = [];
            try {
                users = JSON.parse(data); // Parse existing data
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
