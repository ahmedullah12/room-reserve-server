import dotenv from 'dotenv';
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};
