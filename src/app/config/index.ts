import dotenv from 'dotenv';
dotenv.config();

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  payment_url: process.env.PAYMENT_URL,
  store_id: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_key: process.env.STRIPE_WEBHOOK_KEY,
};
