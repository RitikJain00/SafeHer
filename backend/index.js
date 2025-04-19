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

// Fake call route
app.post('/fake-call', (req, res) => {
  const { userPhoneNumber } = req.body;  // Phone number of the user

  // Simulate a fake call (using Twilio to initiate a call)
  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml',  // Placeholder for your fake call logic
      to: userPhoneNumber,
      from: twilioPhone,  // Use your Twilio phone number here
    })
    .then(call => {
      res.status(200).json({ message: 'Fake call triggered', callSid: call.sid });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error triggering fake call', error: err });
    });
});

// SOS route to send messages
app.post('/sos', async (req, res) => {
  const { message, contacts } = req.body;

  if (!contacts || contacts.length === 0) {
    return res.status(400).json({ error: 'No contacts provided' });
  }

  try {
    const results = [];

    for (const number of contacts) {
      const msg = await client.messages.create({
        body: message,
        from: twilioPhone,
        to: number,
      });
      results.push(msg.sid);
    }

    res.status(200).json({ success: true, sids: results });
  } catch (error) {
    console.error('Twilio Error:', error);
    res.status(500).json({ error: 'Failed to send SOS messages' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('SafeHer Backend is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});