import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';

let server: Server;

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`Database connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application listening on ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to connect DB', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
