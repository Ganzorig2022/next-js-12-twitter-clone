import mongoose, { model, models, Schema } from 'mongoose';

//https://mongoosejs.com/docs/guide.html
const LikeSchema = new Schema(
  {
    // "User" collection-toi ref-eer holbogdono.
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Types.ObjectId, ref: 'Post' },
  },
  {
    //https://mongoosejs.com/docs/timestamps.html
    timestamps: true,
  }
);

const Like = models?.Like || mongoose.model('Like', LikeSchema);

export default Like;
