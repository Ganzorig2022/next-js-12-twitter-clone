import mongoose, { model, models, Schema } from 'mongoose';

//https://mongoosejs.com/docs/guide.html
const FollowerSchema = new Schema({
  // person who is following
  source: { type: mongoose.Types.ObjectId, required: true },
  // person who is followed
  destination: { type: mongoose.Types.ObjectId, required: true },
});

const Follower = models?.Follower || mongoose.model('Follower', FollowerSchema);

export default Follower;
