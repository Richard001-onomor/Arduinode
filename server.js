// require('dotenv').config(); // Load environment variables from .env file

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const {dbConnect} = require('./dbConnect')

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Define Mongoose schema
// const sensorDataSchema = new mongoose.Schema({
//   sensorValue1: Number,
//   sensorValue2: Number,
// });

// Create Mongoose model
// const SensorData = mongoose.model('SensorData', sensorDataSchema);

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err);
//   });
// dbConnect()


// POST endpoint to receive sensor data
// app.post('/sensor-data', (req, res) => {
  // Extract the sensor data from the request body
  // const { sensorValue1, sensorValue2 } = req.body;

  // console.log('Received sensor data:');
  // console.log('Sensor Value 1:', sensorValue1);
  // console.log('Sensor Value 2:', sensorValue2);


  // Create a new instance of the SensorData model
  // const newSensorData = new SensorData({
  //   sensorValue1,
  //   sensorValue2,
  // });

  // Save the sensor data to MongoDB
//   newSensorData.save()
//     .then(() => {
//       console.log('Data inserted into MongoDB successfully');
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.error('Failed to insert data into MongoDB:', err);
//       res.sendStatus(500);
//     });
// });

// app.get('/', (req, res) => {
//   // console.log(req)
//   // Retrieve data from MongoDB
//   SensorData.find()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.error('Failed to retrieve data from MongoDB:', err);
//       res.sendStatus(500);
//     });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConnect = require('./dbConnect');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define Mongoose schema
const sensorDataSchema = new mongoose.Schema({
  sensorValue1: Number,
  sensorValue2: Number,
});

// Create Mongoose model
const SensorData = mongoose.model('SensorData', sensorDataSchema);


// Connect to MongoDB using the dbConnect function
dbConnect()
  .then(() => {
    
    // POST endpoint to receive sensor data
    app.post('/sensor-data', (req, res) => {
      // Extract the sensor data from the request body
      const { sensorValue1, sensorValue2 } = req.body;

      console.log('Received sensor data:');
      console.log('Sensor Value 1:', sensorValue1);
      console.log('Sensor Value 2:', sensorValue2);

      // Create a new instance of the SensorData model
      const newSensorData = new SensorData({
        sensorValue1,
        sensorValue2,
      });

      // Save the sensor data to MongoDB
      newSensorData.save()
        .then(() => {
          console.log('Data inserted into MongoDB successfully');
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error('Failed to insert data into MongoDB:', err);
          res.sendStatus(500);
        });
    });

    app.get('/', (req, res) => {
      // Retrieve data from MongoDB
      SensorData.find()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          console.error('Failed to retrieve data from MongoDB:', err);
          res.sendStatus(500);
        });
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
