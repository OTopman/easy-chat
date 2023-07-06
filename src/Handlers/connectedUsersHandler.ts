import io from 'socket.io';
import catchAsync from '../Helpers/catchAsync';
import { activeUsers } from '../configs/users';



export default catchAsync(async (data: any, io: io.Server) => {
  const { username } = data;
  activeUsers.add(username);
  io.emit('users', activeUsers);
});

