import connectDB from '@/db/connectdb';
import Order from '@/models/Order';
import User from '@/models/User';

export default async function handler(req, res) {
    await connectDB();

    if (req.method === 'POST') {
        const { user_email, order } = req.body;

        try {
            const user = await User.findOne({ email: user_email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const newOrder = new Order({
                userId: user._id,
                date: new Date(),
                items: order.items,
            });

            await newOrder.save();

            res.status(201).json({ message: 'Order added successfully', order: newOrder });
        } catch (error) {
            console.error('Error adding order:', error);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
