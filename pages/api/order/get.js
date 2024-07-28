import connectDB from '@/db/connectdb';
import Order from '@/models/Order';

export default async function handler(req, res) {
    try {
        await connectDB();

        if (req.method === 'GET') {
            const { user_email } = req.query;

            if (!user_email) {
                return res.status(400).json({ message: 'User email is required.' });
            }

            const order = await Order.findOne({ user_email });

            if (!order) {
                return res.status(200).json({ items: {} });
            }

            res.status(200).json(order);
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling order request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
