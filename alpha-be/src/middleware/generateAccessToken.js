import jwt from 'jsonwebtoken'
import env from 'dotenv';

env.config()


const generateAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
};

export default generateAccessToken;