import { DateOnlyDataType } from "sequelize";

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  gender: string;
  dob ?: DateOnlyDataType;
}
