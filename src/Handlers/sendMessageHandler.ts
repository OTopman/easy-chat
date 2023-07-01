import io from 'socket.io';
import uniqid from 'uniqid';

import AppError from '../Helpers/AppError';
import catchAsync from '../Helpers/catchAsync';
import messages from '../Helpers/messages';
import { AppRepository } from '../Models/AppRepository';
import { Message } from '../Models/Message';

export default catchAsync(async (data: any, io: io.Server) => {
  const { sender, message } = data;
  if (!sender) {
    throw new AppError(messages.ERR_OPERATION_NOT_ALLOWED, 401);
  }

  // Instantiate data repository
  const messageRepository = AppRepository.getRepository(Message);

  // Save message
  const msg: Message = {
    sender,
    createdAt: new Date().toISOString(),
    message,
    uuid: uniqid(),
  };
  await messageRepository.save(msg);

  io.emit('message', msg);
});

