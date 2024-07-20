// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    shopname: { type: String },
    phoneno: { type: String },
    address: { type: String },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
  