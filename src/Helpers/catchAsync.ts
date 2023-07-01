import io from 'socket.io';
import globalErrorHandler from '../Middlewares/globalErrorHandler';

/**
 * Wrapper around the controller to handle any exception threw
 * in the controller and send it over to the exception handler middleware
 * @param {Function} fn
 * @return {void}
 */
export default function catchAsync(fn: Function) {
  return (data: any, io: io.Server) => {
    return fn(data, io)?.catch((err: any) => globalErrorHandler(err, io));
  };
}

