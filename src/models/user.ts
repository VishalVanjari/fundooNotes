/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import { Model, DateOnlyDataType, DataTypes } from 'sequelize';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
const saltRound = 10;
export default (sequelize, DataTypes) => {
  class User extends Model<IUser> implements IUser {
    public id;
    public firstName;
    public lastName;
    public email;
    public password;
    public mobile;
    public gender;
    public dob?: DateOnlyDataType;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: false,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, saltRound);
          }
        }
      }
    }
  );
  return User;
};
