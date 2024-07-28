import { getSession } from 'next-auth/react';
import connectDB from '@/db/connectdb';
import Cart from '@/models/Cart';

export default async function handler(req, res) {
    const session = await getSession({ req });
    console.log('Session:', session); // Debugging line

    if (!session) {
        console.log('Unauthorized access attempt:', req.headers);
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
        } else if (req.method === 'POST') {
            const { item } = req.body;
            let cart = await Cart.findOne({ user_email: session.user.email });

            if (cart) {
                const existingItemIndex = cart.items.findIndex(i => i.itemcode === item.itemcode);
                if (existingItemIndex >= 0) {
                    if (item.qty <= 0) {
                        cart.items.splice(existingItemIndex, 1);
                    } else {
                        cart.items[existingItemIndex].qty = item.qty;
                    }
                } else if (item.qty > 0) {
                    cart.items.push(item);
                }

                await cart.save();
            } else {
                cart = new Cart({
                    user_email: session.user.email,
                    items: [item]
                });
                await cart.save();
            }

            res.status(200).json({ cart: cart.items });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling cart request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
