import express from 'express';
import http from 'http';

import connectedUsersHandler from './Handlers/connectedUsersHandler';
import fetchMessagesHandler from './Handlers/fetchMessagesHandler';
import sendMessageHandler from './Handlers/sendMessageHandler';
import logger from './Helpers/logger';
import { AppRepository } from './Models/AppRepository';
import { AppSocket } from './Services/AppSocket';

const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || 'localhost';

const app = express();
const server = http.createServer(app);

const activeUsers = new Set();
const io = AppSocket.init(server);

io.on('connection', (socket) => {
  logger.info('New user connected');

  socket.on('login', (data) => connectedUsersHandler(data, io));
  socket.on('send:message', (data) => sendMessageHandler(data, io));
  socket.on('list:message', (data) => fetchMessagesHandler(data, io));
});

server.listen(PORT, function () {
  logger.info(`App started on: http://${HOST}:${PORT}`);

  AppRepository.initialize()
    .then(() => logger.info('App connected to database'))
    .catch((err) => logger.error(err));
});

process.on('unhandledRejection', (err: Error) => {
  console.log(err);
  logger.error(err.message, err);
  logger.info('UNHANDLED REJECTION. Shutting down...❌');
  // Close connection gracefully
  logger.exitOnError = true;
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaughtException error
process.on('uncaughtException', (err: Error) => {
  console.log(err);
  logger.error(err.name, err);
  logger.info('UNCAUGHT EXCEPTION. Shutting down...❌');
  // Close connection gracefully
  logger.exitOnError = true;
  server.close(() => {
    process.exit(1);
  });
});

