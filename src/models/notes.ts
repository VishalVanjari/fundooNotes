/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import { Model, DateOnlyDataType, DataTypes } from 'sequelize';
import User from './user';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
export default (sequelize, DataTypes) => {
  class Notes extends Model {
    public title;
    public description;
    public color;
    public archive;
    public trash;
    public createdby;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notes.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        //defaultValue : 'white',
        allowNull: false
      },
      archive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      trash: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      createdby: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'notes',
      timestamps: false
    }
  );
  return Notes;
};
