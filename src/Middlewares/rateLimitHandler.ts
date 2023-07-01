import { Request, Response } from 'express';
import expressRateLimit from 'express-rate-limit';
import messages from '../Helpers/messages';

export default expressRateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  handler: function (req: Request, res: Response) {
    res.status(429).json({
      status: 'failed',
      message: messages.RATE_LIMIT_ERR,
    });
  },
});
