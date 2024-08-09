import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';

let token = '';

describe('Fundoo Notes Integration testing', () => {
  describe('Notes APIs Test', () => {
    describe('Register A User', () => {
      it('Registration Of User', (done) => {
        request(app.getApp())
          .post('/users/register')
          .send({
            firstName: 'Pruthvi',
            lastName: 'sharma',
            email: 'sharma@gmail.com',
            password: 'sharma@123',
            mobile: '4563214562',
            gender: 'Male',
            dob: '2001-05-25'
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
            email: 'sharma@gmail.com',
            password: 'sharma@123'
          })
          .end((err, res) => {
            token = 'bearer ' + res.body.token;
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Create new note', () => {
      it('Detail of Note', (done) => {
        request(app.getApp())
          .post('/notes/create')
          .set('Authorization', token)
          .send({
            title: 'Sharma Title 1',
            description: 'description 1',
            color: 'green',
            archive: 'true',
            trash: 'false'
          })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(201);
            done();
          });
      });
    });

    describe('Get All notes', () => {
      it('Array of all Notes', (done) => {
        request(app.getApp())
          .get('/notes/getnotes')
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Get Specific sinngle note', () => {
      it('Detail of Specific single Note', (done) => {
        const id = '1';
        request(app.getApp())
          .get(`/notes/getnotes/${id}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });

    describe('Update the note', () => {
      it('Detail of Updated Note', (done) => {
        const id = '1';
        request(app.getApp())
          .put(`/notes/updatenotes/${id}`)
          .set('Authorization', token)
          .send({
            title: 'Ttile 1',
            description: 'Updated description 1'
          })
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });

    describe('Archive the note', () => {
      it('Detail of Archive Note', (done) => {
        const id = '1';
        request(app.getApp())
          .put(`/notes/archivenotes/${id}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });

    describe('Trash the note', () => {
      it('Detail of Trash Note', (done) => {
        const id = '1';
        request(app.getApp())
          .put(`/notes/trashnotes/${id}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(202);
            done();
          });
      });
    });

    describe('Delete the note', () => {
      it('Detail of delete Note', (done) => {
        const id = '1';
        request(app.getApp())
          .delete(`/notes/deletenotes/${id}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            done();
          });
      });
    });
  });
});
