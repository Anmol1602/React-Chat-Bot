const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const otpGenerator = require('otp-generator');  // To generate OTPs
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); // Important for parsing JSON requests

const DATA_FILE_USER = path.join(__dirname, 'data/users.json');
const DATA_FILE = path.join(__dirname, 'data/contacts.json');

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail', 'yahoo', 'outlook', etc., based on your email provider
    auth: {
        user: 'anmol16072002@gmail.com', // Your email address
        pass: 'uejs jcyl sweg llvv', // Your email password or app-specific password
    },
});

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
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Missing required fields');
    }

    const newUser = { name, email, password, subscription: 'free', subscriptionExpiry: null };

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

        res.json({ name: user.name, email: user.email, subscription: user.subscription, subscriptionExpiry: user.subscriptionExpiry });
    });
});

// Endpoint to fetch user profile
app.get('/user-profile', (req, res) => {
    const { email } = req.query; // Pass email as a query parameter
    if (!email) {
        return res.status(400).send('Missing required email');
    }

    fs.readFile(DATA_FILE_USER, (err, data) => {
        if (err) {
            return res.status(500).send('Internal server error');
        }

        const users = JSON.parse(data);
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    });
});

// Endpoint to update user profile
// amazonq-ignore-next-line
app.put('/user-profile', (req, res) => {
    const { email, ...updatedFields } = req.body;
    if (!email) {
        return res.status(400).send('Missing required email');
    }

    fs.readFile(DATA_FILE_USER, (err, data) => {
        if (err) {
            return res.status(500).send('Internal server error');
        }

        const users = JSON.parse(data);
        const userIndex = users.findIndex((u) => u.email === email);

        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        // Update user fields
        users[userIndex] = { ...users[userIndex], ...updatedFields };

        fs.writeFile(DATA_FILE_USER, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Internal server error');
            }

            res.json(users[userIndex]);
        });
    });
});

// Store active OTPs temporarily for validation
let activeOtps = {};

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email, subscription } = req.body;
    console.log('Incoming OTP request:', { email, subscription });

    if (!email || !subscription) {
        return res.status(400).send('Missing required fields');
    }

    if (subscription !== 'year') {
        return res.status(400).send('OTP is required only for changing to the 1-year plan');
    }

    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    activeOtps[email] = otp;

    console.log(`Generated OTP for ${email}: ${otp}`);

    // Send OTP via email
    const mailOptions = {
        from: 'your-email@gmail.com', // Sender's email address
        to: email, // Recipient's email address
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}. This code is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Failed to send OTP email');
        }

        console.log('Email sent:', info.response);

        // Remove OTP after 5 minutes
        setTimeout(() => {
            delete activeOtps[email];
        }, 5 * 60 * 1000);

        res.status(200).send('OTP sent successfully');
    });
});



// Endpoint to validate OTP and update subscription
// amazonq-ignore-next-line
app.post('/validate-otp', (req, res) => {
    const { email, otp, subscription } = req.body;
    if (!email || !otp || !subscription) {
        return res.status(400).send('Missing required fields');
    }

    // Validate OTP
    if (activeOtps[email] !== otp) {
        return res.status(400).send('Invalid OTP');
    }

    // OTP is valid, update user subscription
    fs.readFile(DATA_FILE_USER, (err, data) => {
        if (err) {
            return res.status(500).send('Internal server error');
        }

        const users = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.email === email);

        if (userIndex === -1) {
            return res.status(404).send('User not found');
        }

        // Update subscription to 'year' and set expiry date
        users[userIndex].subscription = subscription;
        if (subscription === 'year') {
            users[userIndex].subscriptionExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
        }

        fs.writeFile(DATA_FILE_USER, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving user data');
            }

            res.json(users[userIndex]);
        });
    });
});

// Endpoint to save data (user contacts)
// amazonq-ignore-next-line
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
