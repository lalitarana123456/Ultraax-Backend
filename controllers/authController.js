import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, avatar_url } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword, avatar_url);

    const token = generateToken(user);
    res.status(201).json({ message: 'Signup successful', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
