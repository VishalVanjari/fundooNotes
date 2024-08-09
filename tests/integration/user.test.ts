import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

let token = '';
let forgetToken = '';

describe('Fundoo Notes Integration testing', () => {
  describe('User APIs Test', () => {
    describe('Register A User', () => {
      it('Registration Of User', (done) => {
        request(app.getApp())
          .post('/users/register')
          .send({
            firstName: 'Sakshi',
            lastName: 'Kukreja',
            email: 'sakshi@gmail.com',
            password: 'sakshi@123',
            mobile: '9876541230',
            gender: 'Female',
            dob: '2002-08-08'
          })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
    });

    describe('Login A User', () => {
      it('Login Of User', (done) => {
        request(app.getApp())
          .post('/users/login')
          .send({
            email: 'sakshi@gmail.com',
            password: 'sakshi@123'
          })
          .end((err, res) => {
            token = 'bearer ' + res.body.token;
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('User Profile', () => {
      it('Detail of User', (done) => {
        request(app.getApp())
          .get('/users/getuser')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('User Profile Updating', () => {
      it('Updating of User', (done) => {
        request(app.getApp())
          .put('/users/updateuser')
          .set('Authorization', token)
          .send({
            firstName: 'Khushi',
            lastName: 'Agrawal',
            email: 'khushi@gmail.com',
            password: 'khushi@123'
          })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });

    describe('User Profile Password Changing', () => {
      it('Change Password of User', (done) => {
        request(app.getApp())
          .post('/users/change')
          .set('Authorization', token)
          .send({
            password: 'khushi@1234'
          })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });

    //+/////////////////////////////////////////////////////////////////////////

    describe('User Profile Forgot', () => {
      it('Request for Password Change of User', (done) => {
        request(app.getApp())
          .post('/users/forget')
          .send({ email: 'khushi@gmail.com' })
          .end((err, res) => {
            forgetToken = 'bearer ' + res.body.token;
            console.log(res.body);
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });

    describe('User Profile Password reset', () => {
      it('Password reset of User', (done) => {
        request(app.getApp())
          .post('/users/reset')
          .set('Authorization', forgetToken)
          .send({ password: 'khushi@123' })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });
  });

  ///////////////////////////////////////////////////////////

  // describe('Notes APIs Test', () => {
  //   describe('Create new note', () => {
  //     it('Detail of Note', (done) => {
  //       request(app.getApp())
  //         .post('/notes/create')
  //         .set('Authorization', token)
  //         .send({
  //           title: 'Ttile 2',
  //           description: 'description 2',
  //           color: 'Black',
  //           archive: 'true',
  //           trash: 'false'
  //         })
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(201);
  //           done();
  //         });
  //     });
  //   });

  //   describe('Get All notes', () => {
  //     it('Array of all Notes', (done) => {
  //       request(app.getApp())
  //         .get('/notes/getnotes')
  //         .set('Authorization', token)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(200);
  //           done();
  //         });
  //     });
  //   });

  //   describe('Get Specific sinngle note', () => {
  //     it('Detail of Specific single Note', (done) => {
  //       const id = '1';
  //       request(app.getApp())
  //         .get(`/notes/getnotes/${id}`)
  //         .set('Authorization', token)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(200);
  //           done();
  //         });
  //     });
  //   });

  //   describe('Update the note', () => {
  //     it('Detail of Updated Note', (done) => {
  //       const id = '1';
  //       request(app.getApp())
  //         .put(`/notes/updatenotes/${id}`)
  //         .set('Authorization', token)
  //         .send({
  //           title: 'Ttile 1',
  //           description: 'Updated description 1'
  //         })
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(202);
  //           done();
  //         });
  //     });
  //   });

  //   describe('Archive the note', () => {
  //     it('Detail of Archive Note', (done) => {
  //       const id = '1';
  //       request(app.getApp())
  //         .put(`/notes/archivenotes/${id}`)
  //         .set('Authorization', token)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(202);
  //           done();
  //         });
  //     });
  //   });

  //   describe('Trash the note', () => {
  //     it('Detail of Trash Note', (done) => {
  //       const id = '1';
  //       request(app.getApp())
  //         .put(`/notes/trashnotes/${id}`)
  //         .set('Authorization', token)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(202);
  //           done();
  //         });
  //     });
  //   });

  //   describe('Delete the note', () => {
  //     it('Detail of delete Note', (done) => {
  //       const id = '1';
  //       request(app.getApp())
  //         .delete(`/notes/deletenotes/${id}`)
  //         .set('Authorization', token)
  //         .end((err, res) => {
  //           expect(res.statusCode).to.be.equal(200);
  //           done();
  //         });
  //     });
  //   });
  // });
});
