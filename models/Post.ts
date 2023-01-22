import mongoose, { model, models, Schema } from 'mongoose';

//https://mongoosejs.com/docs/guide.html
const PostSchema = new Schema(
  {
    // "User" collection-toi ref-eer holbogdono.
    author: { type: mongoose.Types.ObjectId, ref: 'User' },
    text: String,
    likesCount: { type: Number, default: 0 },
    // hunii post-dr REPLY hj post nemehed henii poston dr we gedgiig todruulahin tuld...
    parent: { type: mongoose.Types.ObjectId, ref: 'Post' },
  },
  {
    //https://mongoosejs.com/docs/timestamps.html
    timestamps: true,
  }
);

const Post = models?.Post || model('Post', PostSchema);

export default Post;
