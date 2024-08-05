import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    // register the new user
    this.router.post('/register', this.UserValidator.newUser, this.UserController.registerUser);

    // Login user
    this.router.post('/login', this.UserValidator.login, this.UserController.loginUser);

    //route to Get a user by their id
    this.router.get('/:id', this.UserController.getUser);

    //route to Get all user 
    this.router.get('/', this.UserController.getAllUsers);

    //route to update a user by their id
    this.router.put('/:id', this.UserController.updateUser);

    //route to delete a user by their id
    this.router.delete('/:id', this.UserController.deleteUser);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
