// pages/api/add-to-order.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await client.connect();
      const database = client.db('test');
      const collection = database.collection('orders');

      const { user_email, order } = req.body;
      
      if (!user_email || !order) {
        return res.status(400).json({ message: 'User ID and order are required.' });
      }

      // Save order to the database
      await collection.updateOne(
        { user_email },
        { $set: { order } },
        { upsert: true }
      );

      res.status(200).json({ message: 'order saved successfully.' });
    } catch (error) {
      console.error('Failed to save order:', error);
      res.status(500).json({ message: 'Failed to save order.' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
