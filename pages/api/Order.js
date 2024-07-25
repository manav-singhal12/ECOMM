// import connectDB from '@/db/connectdb';
// import Order from '@/models/Order';

// export default async function handler(req, res) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     const { user_email,
//         product_id,
//         product_name,
//         poduct_price,
//         poduct_quantity,
//         size,
//         variant,
//         image,
//         poduct_total, } = req.body;

//     try {
//         await connectDB();

//         const newOrder = new Order({
//             user_email,
//             product_id,
//             product_name,
//             poduct_price,
//             poduct_quantity,
//             size,
//             variant,
//             image,
//             poduct_total,
//         });

//         await newOrder.save();

//         res.status(201).json({ message: 'Order saved', Order: newOrder });
//     } catch (error) {
//         console.error('Error saving Order:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
