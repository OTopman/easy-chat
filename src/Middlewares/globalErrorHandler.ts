import { Request, Response, NextFunction } from 'express';
import io from 'socket.io';

import AppError from '../Helpers/AppError';
import messages from '../Helpers/messages';

// Handle database errors
const handleCastError = function (err: any) {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

/**
 * Send error in development environment
 * @param {Error | AppError} err - Error object
 * @param {Response} res - Response object
 */
const sendDevelopmentError = (err: any, io: io.Server) => {
  return io.emit('error', {
    status: 'failed',
    message: err.message,
    error: err,
    stackTrace: err.stack,
  });
};

/**
 * Send error in production environment
 * @param {AppError | Error} err - Error object
 * @param {io.Server} io - Socket server object
 */
const sendProductionError = (err: any, io: io.Server) => {
  if (err.isOperational) {
    return io.emit('error', {
      status: 'failed',
      message: err.message,
      error: err,
    });
  } else {
    return io.emit('error', {
      status: 'failed',
      message: messages.UNKNOWN_ERR,
    });
  }
};

/**
 * This will handle global error
 *
 * @param {AppError | Error} err
 * @param {io.Server} io
 */
export default function globalErrorHandler(err: any, io: io.Server) {
  let error = err;
  console.log(error);
  if (error.name === 'CastError') {
    error = handleCastError(error);
  }

  // Handle production error
  if (process.env.NODE_ENV === 'production') {
    sendProductionError(error, io);
  } else if (process.env.NODE_ENV === 'development') {
    sendDevelopmentError(error, io);
  }
}

