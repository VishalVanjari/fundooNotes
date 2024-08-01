import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import user from '../models/user';
import { log } from 'winston';

const saltRound: number = 10;

class UserService {
  private User = user(sequelize, DataTypes);

  //Register a new user

  public registerUser = async (body) => {
    try {
      const hashedPassword = await bcrypt.hash(body.password, saltRound);
      body.password = hashedPassword;
      const data = await this.User.create(body);
      return data;
    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  };

  //Login User
  public loginUser = async (email, password) => {
    try {
      const data = await this.User.findOne({ where: { email: email } });
      let obj = {
        data :data,
        message: 'Invalid User'
      }
      if (data && (await bcrypt.compare(password, data.password))) {
        obj.message = 'Loged In successfully';
      } else {
          obj.data = null;
          return obj;
        return obj;
      }
      return obj;
    } catch (error) {
      throw new error('Error Logging user: ');
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
