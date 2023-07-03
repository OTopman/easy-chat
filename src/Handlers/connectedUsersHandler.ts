import io from 'socket.io';
import AppError from '../Helpers/AppError';
import catchAsync from '../Helpers/catchAsync';
import fetchMessagesHandler from './fetchMessagesHandler';

const activeUsers = new Set();

export default catchAsync(async (data: any, io: io.Server) => {
  const { username } = data;
  // if (activeUsers.has(username)) {
  //   throw new AppError('Username already picked.', 400);
  // }
  activeUsers.add(username);
  io.emit('users', activeUsers);

  //   Fetch messages
  fetchMessagesHandler({ username }, io);
});

