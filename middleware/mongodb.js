import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  try {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    });
    return handler(req, res);
  } catch (err) {
    console.log('database connection failed', err);
    return res
      .status(500)
      .json({ errorMessage: 'Internal server error!' });
  }
};

export default connectDB;
