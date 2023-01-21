import mongoose from 'mongoose';

export function initMongoose() {
  // //https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState
  // if (mongoose.connection.readyState(1)) {
  //   //https://mongoosejs.com/docs/api/connection.html#connection_Connection-asPromise
  //   return mongoose.connection.asPromise();
  // }
  // await mongoose.connect(process.env.MONGODB_URI);
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    console.log('mongoDB connection successful');
  } catch (error) {
    console.log(error);
  }
}
