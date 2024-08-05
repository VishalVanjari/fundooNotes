/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user.controller';

const secretKey = process.env.SECRET_KEY;

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { id, username }: any = await jwt.verify(bearerToken, secretKey);
    (req as any).id = id;
    (req as any).username = username;

    next();
  } catch (error) {
    next(error);
  }
};
