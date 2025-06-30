const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Log connection attempt
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//****:****@')); // Hide credentials in logs

    // Connection options
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      heartbeatFrequencyMS: 2000, // Check server status every 2s
    };

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Monitor connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
      if (err.name === 'MongoServerError') {
        console.error('MongoDB Server Error Details:', {
          code: err.code,
          codeName: err.codeName,
          errorLabels: err.errorLabels,
          errorResponse: err.errorResponse
        });
      }
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });

    // Test the connection with a more comprehensive check
    const Test = mongoose.model('Test', new mongoose.Schema({ 
      name: String,
      timestamp: { type: Date, default: Date.now }
    }));

    // Create test document
    const testDoc = await Test.create({ name: 'connection_test' });
    console.log('Test document created:', testDoc._id);

    // Verify document exists
    const foundDoc = await Test.findById(testDoc._id);
    if (!foundDoc) {
      throw new Error('Document verification failed');
    }
    console.log('Document verification successful');

    // Clean up test document
    await Test.deleteOne({ _id: testDoc._id });
    console.log('Test document cleaned up');

    // Check database stats
    const stats = await mongoose.connection.db.stats();
    console.log('Database Stats:', {
      collections: stats.collections,
      indexes: stats.indexes,
      objects: stats.objects,
      avgObjSize: stats.avgObjSize,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexesSize: stats.indexesSize,
    });

    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (error.name === 'MongoServerError') {
      console.error('Authentication failed. Please check:');
      console.error('1. Username and password in connection string');
      console.error('2. User permissions in MongoDB Atlas');
      console.error('3. Network access settings in MongoDB Atlas');
    }
    process.exit(1);
  }
};

module.exports = connectDB; 