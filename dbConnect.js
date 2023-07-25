const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const connection = await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    console.log('Connected to MongoDB');
    return connection;
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    throw err; // Rethrow the error to handle it in the main code
  }
};

module.exports = dbConnect;
