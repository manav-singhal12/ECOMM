// import connectDB from '@/db/connectdb';
// import mongoose from 'mongoose';

// const cartSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   cart: { type: Object, required: true },
//   updatedAt: { type: Date, default: Date.now },
// });

// const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

// export default async (req, res) => {
//   await connectDB();

//   if (req.method !== 'POST') {
//     res.status(405).json({ message: 'Method not allowed' });
//     return;
//   }

//   const { cart, userId } = req.body;

//   if (!cart || !userId) {
//     res.status(400).json({ message: 'Cart data or user ID missing' });
//     return;
//   }

//   try {
//     const result = await Cart.updateOne(
//       { userId: userId },
//       { $set: { cart: cart, updatedAt: new Date() } },
//       { upsert: true }
//     );

//     res.status(200).json({ message: 'Cart saved successfully', result });
//   } catch (error) {
//     console.error('Error saving cart:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
