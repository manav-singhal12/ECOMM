import connectDB from '@/db/connectdb';
import User from '@/models/User'; // Adjust the path based on your project structure

export default async function handler(req, res) {
  await connectDB();

  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
