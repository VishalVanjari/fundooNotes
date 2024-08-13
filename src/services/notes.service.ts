import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import notes from '../models/notes';
import { log } from 'winston';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const secretKey = process.env.SECRET_KEY;

class NotesService {
  private Notes = notes(sequelize, DataTypes);

  //Create new Note
  public createNote = async (id: number, body: any): Promise<any> => {
    try {
      body.createdby = id;
      const data = await this.Notes.create(body);
      return data;
    } catch (error) {
      throw new Error('Error Creating Note : ' + error.message);
    }
  };

  //get all Notes
  public getAllNotes = async (id: number): Promise<any> => {
    const data = await this.Notes.findAll({ where: { createdby: id } });
    return data;
  };

  //get a single user
  public getSpecificNotes = async (id, userID) => {
    const data = await this.Notes.findOne({
      where: { id: id, createdby: userID }
    });
    return data;
  };

  // update a Note
  public updateNotes = async (id, userID, body) => {
    try {
      await this.Notes.update(body, {
        where: { id: id, createdby: userID }
      });
    } catch (err) {
      throw new Error('Error Updating Note : ');
    }
    return body;
  };

  //Archive the note
  public archiveNotes = async (id, userID) => {
    try {
      const data = await this.Notes.findOne({
        where: { id: id, createdby: userID }
      });
      if (data) {
        data.archive = !data.archive;
        await data.save();
      }
      return data;
    } catch (err) {
      throw new Error('Error Updating Note : ');
    }
  };

  //Trash the note
  public trashNotes = async (id, userID) => {
    try {
      const data = await this.Notes.findOne({
        where: { id: id, createdby: userID }
      });
      if (data) {
        data.trash = !data.trash;
        await data.save();
      }
      return data;
    } catch (err) {
      throw new Error('Error White Trashing Note : ');
    }
  };

  // delete a Note
  public deleteNotes = async (id, userID) => {
    const data = await this.Notes.destroy({
      where: { id: id, createdby: userID }
    });
    return data;
  };
}

export default NotesService;
