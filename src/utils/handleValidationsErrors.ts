import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(406).send({
      status: 'failure',
      data: {
        statusCode: 406,
        error: validationErrors.array().map(err => err.msg)
      }
    });
  }
  next();
};

export default handleValidationErrors;
