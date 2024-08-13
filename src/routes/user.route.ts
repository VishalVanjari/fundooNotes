import express, { IRouter } from 'express';
import userController from '../controllers/user.controller';
import userValidator from '../validators/user.validator';
import { userAuth, forgetUserAuth } from '../middlewares/auth.middleware';

class UserRoutes {
  private UserController = new userController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    // register the new user
    this.router.post(
      '/register',
      this.UserValidator.newUser,
      this.UserController.registerUser
    );

    // Login user
    this.router.post(
      '/login',
      this.UserValidator.login,
      this.UserController.loginUser
    );

    //route to Get a user by their id
    this.router.get('/getuser', userAuth, this.UserController.getUser);

    //route to update a user
    this.router.put('/updateuser', userAuth, this.UserController.updateUser);

    //route to delete a user by their id
    this.router.delete('/deleteuser', userAuth, this.UserController.deleteUser);

    //route to Get all user
    this.router.get('/', this.UserController.getAllUsers);

    // route to Change password
    this.router.post('/change', userAuth, this.UserController.change);

    // route to forget password
    this.router.post('/forget', this.UserController.forget);

    // route to reset password
    this.router.post('/reset', forgetUserAuth, this.UserController.reset);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default UserRoutes;
