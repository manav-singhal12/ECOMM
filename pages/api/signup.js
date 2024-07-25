import connectDB from '@/db/connectdb';
import User from '@/models/User';
import { hashPassword } from '@/db/auth';

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && !email.endsWith('@looks');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (name.length < 4) {
    return res.status(400).json({ message: 'Username must be at least 4 characters long' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format or email ends with @looks' });
  }

  await connectDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(422).json({ message: 'User already exists' });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: 'User created', user: newUser });
}
