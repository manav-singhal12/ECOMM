import { getSession } from 'next-auth/react';
import connectDB from '@/db/connectdb';
import Order from '@/models/Order';


export default async function handler(req, res) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await connectDB();

        if (req.method === 'GET') {
            const order = await Order.findOne({ user_email: session.user.email });
            if (!order) {
                return res.status(200).json({ items: {} });
            }
            res.status(200).json(order);
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling order request:', error);
        res.status(500).json({ message: 'Internal server error' });
        console.log("order");

    }
}