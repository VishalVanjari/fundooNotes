import { expect } from 'chai';
import UserService from '../../src/services/user.service';
import NotesService from '../../src/services/notes.service';

///////////////////////////////////   user    //////////////////////////////////////////////////////

describe('Fundoo Notes User', () => {
  describe('/register : register with id and passsword', () => {
    it('should return object contain registration detail of user', async () => {
      const result = await new UserService().registerUser({
        firstName: 'Vishal',
        lastName: 'Vanjari',
        email: 'vishal@gmail.com',
        password: 'vishal@123',
        mobile: '8329223801',
        gender: 'Male',
        dob: '2002-03-30'
      });
      expect(result).to.be.an('object');
    });
  });

  describe('/login : login with credentials', () => {
    it('should return Details of user', async () => {
      const result = await new UserService().loginUser(
        'Vishal@gmail.com',
        'vishal@123'
      );
      expect(result).to.be.an('object');
    });
  });

  describe('/getuser : get the user', () => {
    it('should return all Details of user', async () => {
      const result = await new UserService().getUser(6);
      expect(result).to.be.an('object');
    });
  });

  describe('/updateuser : Update the user', () => {
    it('Shoud update user and retun updated Data', async () => {
      const result = await new UserService().updateUser(4, {
        firstName: 'Sakshi',
        lastName: 'Kukreja',
        email: 'sakshi@gmail.com'
      });
      expect(result).to.be.an('object');
    });
  });

  describe('/deleteuser : Delete The User', () => {
    it('delete the User and return empty string ', async () => {
      const result = await new UserService().deleteUser(4);
      expect(result).to.equal('');
    });
  });

  describe('/forget : forget the password', () => {
    it('forget password send email and shound return  ', async () => {
      const result = await new UserService().forget('vishal@gmail.com');
      expect(result).to.be.an('object');
    });
  });

  describe('/reset :  reset a password', () => {
    it('reset password send email and shound return  ', async () => {
      const result = await new UserService().reset('vishal@gmail.com', {
        password: 'vishal@210302'
      });
      expect(result).to.be.an('object');
    });
  });
});

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
      const result = await new NotesService().getSpecificNotes(1, 8);
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
      const result = await new NotesService().archiveNotes(5, 8);
      expect(result).to.be.an('object');
    });
  });

  describe('/trashnotes/:id :  trash a note', () => {
    it('trash a one Note and return data  ', async () => {
      const result = await new NotesService().trashNotes(3, 8);
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
