import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
import { cronJobs } from './app/utils/cronJobs';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    cronJobs.setupBookingCronJobs();
    await cronJobs.checkUnprocessedBookings();

    server = app.listen(config.port, () => {
      console.log(`Server running on  ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  console.log(`unhandledRejection is detected, shutting down ...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected, shutting down ...`);
  process.exit(1);
});
