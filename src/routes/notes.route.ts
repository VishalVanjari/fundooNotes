import express, { IRouter } from 'express';
import notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import NoteValidator from '../validators/note.validator';

class NotesRoutes {
  private NotesController = new notesController();
  private router = express.Router();
  private noteValidator = new NoteValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {
    // create new Note
    this.router.post('/create', userAuth, this.NotesController.createNote);

    // get all Notes
    this.router.get('/getnotes', userAuth, this.NotesController.getAllNotes);

    // get specific Notes
    this.router.get(
      '/getnotes/:id',
      userAuth,
      this.NotesController.getSpecificNotes
    );

    // update note by their id
    this.router.put(
      '/updatenotes/:id',
      this.noteValidator.updateNote,
      userAuth,
      this.NotesController.updateNotes
    );

    // Archive the NOtes
    this.router.put(
      '/archivenotes/:id',
      userAuth,
      this.NotesController.archiveNotes
    );

    // trash the Notes
    this.router.put(
      '/trashnotes/:id',
      userAuth,
      this.NotesController.trashNotes
    );

    //  delete a Note by it's id
    this.router.delete(
      '/deletenotes/:id',
      userAuth,
      this.NotesController.deleteNotes
    );
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default NotesRoutes;
