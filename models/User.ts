import { model, models, Schema } from 'mongoose';

//https://mongoosejs.com/docs/guide.html
const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  username: String,
  bio: String,
  cover: String,
});

const User = models?.User || model('User', UserSchema);

export default User;
