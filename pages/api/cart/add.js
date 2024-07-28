// pages/api/add-to-cart.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('carts');

      const { user_email, cart } = req.body;
      
      if (!user_email || !cart) {
        return res.status(400).json({ message: 'User ID and cart are required.' });
      }

      // Save cart to the database
      await collection.updateOne(
        { user_email },
        { $set: { cart } },
        { upsert: true }
      );

      res.status(200).json({ message: 'Cart saved successfully.' });
    } catch (error) {
      console.error('Failed to save cart:', error);
      res.status(500).json({ message: 'Failed to save cart.' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
