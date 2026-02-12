const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGO_URI;

    // If no MONGO_URI provided, and we're not in production, start an in-memory MongoDB instance
    if (!mongoURI) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MONGO_URI environment variable is not set');
      }

      console.log('No MONGO_URI found — starting in-memory MongoDB for development');
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
    }

    const conn = await mongoose.connect(mongoURI, {
      // mongoose v7+ no longer requires these options but leaving for clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message || error);
    console.error('MongoDB connection failed. Please check your MONGO_URI in the .env file.');
    process.exit(1); // Exit if database connection fails
  }
};

module.exports = connectDB;