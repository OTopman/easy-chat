import io from 'socket.io';

import AppError from '../Helpers/AppError';
import catchAsync from '../Helpers/catchAsync';
import messages from '../Helpers/messages';
import { AppRepository } from '../Models/AppRepository';
import { Message } from '../Models/Message';
import { activeUsers } from '../configs/users';

export default catchAsync(async (data: any, io: io.Server) => {
  const { username } = data;
  
  if (!username) {
    throw new AppError(messages.ERR_OPERATION_NOT_ALLOWED, 401);
  }

  if (!activeUsers.has(username)) {
    throw new AppError(messages.ERR_LOGIN, 400);
  }

  // Instantiate data repository
  const messageRepository = AppRepository.getRepository(Message);

  // Fetch messageRepository
  const msgs = await messageRepository.find();
  if (msgs.length <= 0) {
    throw new AppError(messages.ERR_NO_RECORD, 404);
  }

  io.emit('messages', msgs);
});


