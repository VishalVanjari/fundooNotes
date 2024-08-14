import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import user from '../models/user';
import { log } from 'winston';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Util from '../utils/user.util';

const secretKey = process.env.SECRET_KEY;
const saltRound = 10;

class UserService {
  private User = user(sequelize, DataTypes);
  private util = new Util();

  //Register a new user
  public registerUser = async (body) => {
    try {
      // const hashedPassword = await bcrypt.hash(body.password, saltRound);
      // body.password = hashedPassword;
      const data = await this.User.create(body);
      const message = await this.util.sendMessage(data);
      return data;
    } catch (error) {
      throw new Error('Error registering user: ' + error.message);
    }
  };

  //Login User
  public loginUser = async (email, password) => {
    try {
      const data = await this.User.findOne({ where: { email: email } });
      const obj = {
        data: data,
        token: '',
        message: 'Invalid User'
      };
      if (data && (await bcrypt.compare(password, data.password))) {
        obj.message = 'Loged In successfully';
      } else {
        obj.data = null;
        return obj;
      }
      const token = await this.util.login(data.id, data.firstName);
      obj.token = token;
      return obj;
    } catch (error) {
      throw new error('Error Logging user: ');
    }
  };

  //get a single user
  public getUser = async (id) => {
    const data = await this.User.findByPk(id);
    return data;
  };

  //get all users
  public getAllUsers = async (): Promise<any> => {
    const data = await this.User.findAll();
    return data;
  };

  //update a user
  public updateUser = async (id, body) => {
    const hashedPassword = await bcrypt.hash(body.password, saltRound);
    body.password = hashedPassword;
    await this.User.update(body, {
      where: { id: id }
    });
    return body;
  };

  //change password

  public change = async (id, body) => {
    const hashedPassword = await bcrypt.hash(body.password, saltRound);
    body.password = hashedPassword;
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

  //forget User
  public forget = async (email) => {
    try {
      const data = await this.User.findOne({ where: { email: email } });
      const obj = {
        data: data,
        token: '',
        message: 'Invalid User'
      };
      let token = '';
      if (data) {
        token = await this.util.forgetUser(email);
      }
      obj.token = token;
      return obj;
    } catch (error) {
      throw new error('Error Logging user: ');
    }
  };

  //Reset a Password
  public reset = async (email, body) => {
    const hashedPassword = await bcrypt.hash(body.password, saltRound);
    body.password = hashedPassword;
    await this.User.update(
      { password: body.password },
      {
        where: { email: email }
      }
    );
    return body;
  };
}

export default UserService;
