import jwt from 'jsonwebtoken'
import env from 'dotenv';

env.config()


const generateAccessToken = (userId) => {
  return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
};

export default generateAccessToken;

