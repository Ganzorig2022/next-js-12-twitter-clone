import mongoose, { model, models, Schema } from 'mongoose';

//https://mongoosejs.com/docs/guide.html
const PostSchema = new Schema(
  {
    // "User" collection-toi ref-eer holbogdono.
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    text: String,
  },
  {
    //https://mongoosejs.com/docs/timestamps.html
    timestamps: true,
  }
);

const Post = models?.Post || model('Post', PostSchema);

export default Post;
