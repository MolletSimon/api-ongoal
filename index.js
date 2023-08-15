var admin = require("firebase-admin");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({limit: '50mb'}));

//parse the body for post request
app.use(bodyParser.json());

// defining an endpoint to return all ads
app.post('/notification/', (req, res) => {
var messaging = admin.messaging();
var body = req.body;
var team = body.team;
var title = body.title;
var message = body.message;

console.log(body)
  messaging.send({
    android: {
        priority: "high",
      },
    notification: {
        title: title,
        body: message
    },
    topic: team
  }).then((response) => {
    console.log('Successfully sent message:', response);
    res.send('ça tape');
  }
    ).catch((error) => {
    console.log('Error sending message:', error);
    res.send('ça tape pas');
});
});

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
  var serviceAccount = require("./serviceAccount.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin Initialized")
});