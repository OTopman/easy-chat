import io from 'socket.io';
import http from 'http';
import AppError from '../Helpers/AppError';


export class AppSocket {
  private static server: io.Server;
  private constructor() {
    throw new AppError('AppSocket cannot be initialized directly.');
  }

  public static init(server: http.Server): io.Server {
    if (AppSocket.server) {
      return AppSocket.server;
      // throw new AppError('AppSocket::init() cannot be called multiple times.');
    }
    return (AppSocket.server = new io.Server(server));
  }


  // {
  //     cors: {
  //       origin: '*',
  //       methods: ['GET', 'POST'],
  //       credentials: true,
  //       allowedHeaders: ['Authorization'],
  //       optionsSuccessStatus: 200,
  //     },
  //     transports: ['polling'],
  //   }
}

