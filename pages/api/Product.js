// // pages/api/saveCart.js
// import connectDB from "@/db/connectdb";

// export default async (req, res) => {
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
//     const { db } = await connectDB();

//     const result = await db.collection('carts').updateOne(
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
