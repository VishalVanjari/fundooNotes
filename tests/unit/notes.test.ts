import { expect } from 'chai';
import NotesService from '../../src/services/notes.service';

//////////////////////////////////   NOTES   ////////////////////////////////////////

describe('Notes ', () => {
  describe('/create :  create a note', () => {
    it('create a note and return the Note  ', async () => {
      const result = await new NotesService().createNote(8, {
        title: 'Ttile 6',
        description: 'description 6',
        color: 'Red',
        archive: 'true',
        trash: 'false'
      });
      expect(result).to.be.an('object');
    });
  });

  describe('/getnotes :  get all note', () => {
    it('Return all Notes  ', async () => {
      const result = await new NotesService().getAllNotes(8);
      expect(result).to.be.an('array');
    });
  });

  describe('/getnotes/:id :  get a specific note', () => {
    it('Return a Specific one Note  ', async () => {
      const result = await new NotesService().getSpecificNotes(2, 8);
      expect(result).to.be.an('object');
    });
  });

  describe('/updatenotes/:id :  update a note', () => {
    it('Update note and Return a Updated Note  ', async () => {
      const result = await new NotesService().updateNotes(1, 8, {
        title: 'Ttile 8',
        description: 'description 8',
        color: 'Black',
        archive: 'false',
        trash: 'true'
      });
      expect(result).to.be.an('object');
    });
  });

  describe('/archivenotes/:id :  archive a note', () => {
    it('archive a one Note and return data  ', async () => {
      const result = await new NotesService().archiveNotes(2, 8);
      expect(result).to.be.an('object');
    });
  });

  describe('/trashnotes/:id :  trash a note', () => {
    it('trash a one Note and return data  ', async () => {
      const result = await new NotesService().trashNotes(2, 8);
      expect(result).to.be.an('object');
    });
  });

  describe('/deletenotes/:id :  Delete a note', () => {
    it('Delete a one Note and return data', async () => {
      const result = await new NotesService().deleteNotes(4, 8);
      expect(result).to.be.an('number');
    });
  });
});
