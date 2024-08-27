"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const database_1 = __importStar(require("../config/database"));
const notes_1 = __importDefault(require("../models/notes"));
const notes_util_1 = __importDefault(require("../utils/notes.util"));
const secretKey = process.env.SECRET_KEY;
class NotesService {
    constructor() {
        this.Notes = (0, notes_1.default)(database_1.default, database_1.DataTypes);
        this.util = new notes_util_1.default();
        //Create new Note
        this.createNote = (id, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                body.createdby = id;
                const data = yield this.Notes.create(body);
                const updateData = yield this.util.update(id, data);
                return data;
            }
            catch (error) {
                throw new Error('Error Creating Note : ' + error.message);
            }
        });
        //get all Notes
        this.getAllNotes = (id) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Notes.findAll({ where: { createdby: id } });
            return data;
        });
        //get a single user
        this.getSpecificNotes = (id, userID) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Notes.findOne({
                where: { id: id, createdby: userID }
            });
            return data;
        });
        // update a Note
        this.updateNotes = (id, userID, body) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.Notes.update(body, {
                    where: { id: id, createdby: userID }
                });
            }
            catch (err) {
                throw new Error('Error Updating Note : ');
            }
            return body;
        });
        //Archive the note
        this.archiveNotes = (id, userID) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Notes.findOne({
                    where: { id: id, createdby: userID }
                });
                if (data) {
                    data.archive = !data.archive;
                    yield data.save();
                }
                return data;
            }
            catch (err) {
                throw new Error('Error Updating Note : ');
            }
        });
        //Trash the note
        this.trashNotes = (id, userID) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Notes.findOne({
                    where: { id: id, createdby: userID }
                });
                if (data) {
                    data.trash = !data.trash;
                    yield data.save();
                }
                return data;
            }
            catch (err) {
                throw new Error('Error White Trashing Note : ');
            }
        });
        // delete a Note
        this.deleteNotes = (id, userID) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.Notes.destroy({
                where: { id: id, createdby: userID }
            });
            return data;
        });
    }
}
exports.default = NotesService;
