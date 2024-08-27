"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controller_1 = __importDefault(require("../controllers/notes.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const note_validator_1 = __importDefault(require("../validators/note.validator"));
const notes_util_1 = __importDefault(require("../utils/notes.util"));
class NotesRoutes {
    constructor() {
        this.NotesController = new notes_controller_1.default();
        this.router = express_1.default.Router();
        this.noteValidator = new note_validator_1.default();
        this.util = new notes_util_1.default();
        this.routes = () => {
            // create new Note
            this.router.post('/create', auth_middleware_1.userAuth, this.NotesController.createNote);
            // get all Notes
            this.router.get('/getnotes', auth_middleware_1.userAuth, this.util.get, this.NotesController.getAllNotes);
            // get specific Notes
            this.router.get('/getnotes/:id', auth_middleware_1.userAuth, this.NotesController.getSpecificNotes);
            // update note by their id
            this.router.put('/updatenotes/:id', this.noteValidator.updateNote, auth_middleware_1.userAuth, this.NotesController.updateNotes);
            // Archive the NOtes
            this.router.put('/archivenotes/:id', auth_middleware_1.userAuth, this.NotesController.archiveNotes);
            // trash the Notes
            this.router.put('/trashnotes/:id', auth_middleware_1.userAuth, this.NotesController.trashNotes);
            //  delete a Note by it's id
            this.router.delete('/deletenotes/:id', auth_middleware_1.userAuth, this.NotesController.deleteNotes);
        };
        this.getRoutes = () => {
            return this.router;
        };
        this.routes();
    }
}
exports.default = NotesRoutes;
