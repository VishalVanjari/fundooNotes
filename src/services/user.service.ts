import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';

import user from '../models/user';

class UserService {
  private User = user(sequelize, DataTypes);

  //Register a new user
  public registerUser = async (body) => {
    const data = await this.User.create(body);
    return data;
  };

  //Login User
  public loginUser = async (email) => {
    const data = await this.User.findOne({ where: { email: email } });
    if (data === null) {
      return { message: 'Email is wrong' };
    } else {
      return data;
    }
  };

  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await this.User.findAll();
    return data;
  };

  //update a user
  public updateUser = async (id, body) => {
    await this.User.update(body, {
      where: { id: id }
    });
    return body;
  };

  //delete a user
  public deleteUser = async (id) => {
    await this.User.destroy({ where: { id: id } });
    return '';
  };
}

export default UserService;
