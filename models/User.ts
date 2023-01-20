import { model, Schema } from 'mongoose';

//https://mongoosejs.com/docs/guide.html
const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  userName: String,
});

const User = model('User', UserSchema);

export default User;
