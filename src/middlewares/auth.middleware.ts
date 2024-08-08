/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import UserController from '../controllers/user.controller';
import Util from '../utils/user.util';

const secretKey = process.env.SECRET_KEY;
const util = new Util();

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
    console.log("***************************",bearerToken);
    

    const { id, username }: any = await jwt.verify(bearerToken, secretKey);
    
    (req as any).id = id;
    (req as any).username = username;

    console.log((req as any).id, "ID ***************************");
    

    next();
  } catch (error) {
    next(error);
  }
};


export const forgetUserAuth = async (
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
    const email  = await util.forgetUseVerify(bearerToken); 
    (req as any).email = email;

    next();
  } catch (error) {
    next(error);
  }
};
