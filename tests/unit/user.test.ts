import { expect } from 'chai';
import UserService from '../../src/services/user.service';

///////////////////////////////////   user    //////////////////////////////////////////////////////

describe('Fundoo Notes User : Unit Testing', () => {
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
      const result = await new UserService().getUser(1);
      expect(result).to.be.an('object');
    });
  });

  describe('/updateuser : Update the user', () => {
    it('Shoud update user and retun updated Data', async () => {
      const result = await new UserService().updateUser(2, {
        firstName: 'Sakshi',
        lastName: 'Kukreja',
        email: 'sakshi@gmail.com',
        password : 'sakshi@123'
      });
      expect(result).to.be.an('object');
    });
  });

  describe('/change : change the password', () => {
    it('Shoud Change Password and retun updated Data', async () => {
      const result = await new UserService().change(4, {
        password: 'sakshi@8520'
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

