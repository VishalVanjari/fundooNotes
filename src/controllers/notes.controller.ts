/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import notesService from '../services/notes.service';

import { Request, Response, NextFunction } from 'express';

class NotesController {
  public NotesService = new notesService();

  //create the new Notes
  public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.createNote(
        req.body,
        (req as any).id
      );
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Notes Created successfully'
      });
    } catch (error) {
      next(error);
    }
  };


  // Get All Notes
  public getAllNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.getAllNotes((req as any).id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All Notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


  //Get Specific Note
  public getSpecificNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.getSpecificNotes(
        req.params.id,
        (req as any).id
      );
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


  // Update Note
  public updateNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.updateNotes(
        req.params.id,
        (req as any).id,
        req.body
      );
      if (data != null) {
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data,
          message: 'Note updated successfully'
        });
      } else {
        mesage: 'Node id is wrong';
      }
    } catch (error) {
      next(error);
    }
  };


  // Archive the notes
  public archiveNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.archiveNotes(
        req.params.id,
        (req as any).id
      );
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note Archive successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  

  // Trash the notes
  public trashNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.trashNotes(
        req.params.id,
        (req as any).id
      );
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note Trash successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete Node by id
  public deleteNotes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.NotesService.deleteNotes(
        req.params.id,
        (req as any).id
      );
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default NotesController;
