import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
   newUser = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(3).required(),
      lastName: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      mobile: Joi.number().min(10).required(),
      gender: Joi.string(),
      dob: Joi.date()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  public login = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
      next(error);
    }
    next();
  };

  // public update = (req: Request, res: Response, next: NextFunction): void => {
  //   const schema = Joi.object({
  //     firstName: Joi.string().min(3),
  //     lastName: Joi.string().min(3),
  //     email: Joi.string().email(),
  //     password: Joi.string().min(8),
  //     mobile: Joi.number().min(10),
  //     gender: Joi.string(),
  //     dob:public Joi.date(),
  //   });
  //   const { error } = schema.validate(req.body);
  //   if (error) {
  //     next(error);
  //   }
  //   next();
  // };
}

export default UserValidator;
