import connectDB from '@/db/connectdb';
import Cart from '@/models/Cart';

export default async function handler(req, res) {
    try {
        await connectDB();

        if (req.method === 'GET') {
            const { user_email } = req.query;

            if (!user_email) {
                return res.status(400).json({ message: 'User email is required.' });
            }

            const cart = await Cart.findOne({ user_email });

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
