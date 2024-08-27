"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const notes_service_1 = __importDefault(require("../services/notes.service"));
class NotesController {
    constructor() {
        this.NotesService = new notes_service_1.default();
        //create the new Notes
        this.createNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.createNote(req.id, req.body);
                res.status(http_status_codes_1.default.CREATED).json({
                    code: http_status_codes_1.default.CREATED,
                    data: data,
                    message: 'Notes Created successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Get All Notes
        this.getAllNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.getAllNotes(req.id);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'All Notes fetched successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        //Get Specific Note
        this.getSpecificNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.getSpecificNotes(req.params.id, req.id);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'Note fetched successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Update Note
        this.updateNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.updateNotes(req.params.id, req.id, req.body);
                if (data != null) {
                    res.status(http_status_codes_1.default.ACCEPTED).json({
                        code: http_status_codes_1.default.ACCEPTED,
                        data: data,
                        message: 'Note updated successfully'
                    });
                }
                else {
                    mesage: 'Node id is wrong';
                }
            }
            catch (error) {
                next(error);
            }
        });
        // Archive the notes
        this.archiveNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.archiveNotes(req.params.id, req.id);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data,
                    message: 'Note Archive successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Trash the notes
        this.trashNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.trashNotes(req.params.id, req.id);
                res.status(http_status_codes_1.default.ACCEPTED).json({
                    code: http_status_codes_1.default.ACCEPTED,
                    data: data,
                    message: 'Note Trash successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // Delete Node by id
        this.deleteNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.NotesService.deleteNotes(req.params.id, req.id);
                res.status(http_status_codes_1.default.OK).json({
                    code: http_status_codes_1.default.OK,
                    data: data,
                    message: 'Note deleted successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = NotesController;
