import { getSession } from 'next-auth/react';
import connectDB from '@/db/connectdb';
import Cart from '@/models/Cart';

export default async function handler(req, res) {
    const session = await getSession({ req });
    console.log('Session:', session); // Debugging line

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await connectDB();

        if (req.method === 'GET') {
            const cart = await Cart.findOne({ user_email: session.user.email });
            if (!cart) {
                return res.status(200).json({ items: {} });
            }
            res.status(200).json(cart);
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling cart request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
