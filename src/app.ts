import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

//middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://roomreservee.netlify.app',
      'https://room-reserve-client.vercel.app',
    ],
    credentials: true,
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Running!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
