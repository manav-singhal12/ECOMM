import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  user_email: { type: String, ref: 'User', required: true },
  // other fields as needed
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
