import io from 'socket.io';
import AppError from '../Helpers/AppError';
import catchAsync from '../Helpers/catchAsync';

export default catchAsync(async (data: any, io: io.Server) => {
  const { username, isTyping } = data;
  if (!username) {
    throw new AppError('Username is required.', 400);
  }
  // io.emit('typing', `${username} is typing...`);
  io.emit('typing', { username, isTyping });
});

