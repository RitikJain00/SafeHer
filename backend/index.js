const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.json());

// Home route
app.get('/', (req, res) => {
  res.send('SafeHer Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});