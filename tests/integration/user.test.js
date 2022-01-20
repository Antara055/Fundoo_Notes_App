import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import supertest from 'supertest';
import fs from 'fs';
var jwToken = '';
var jwtToken = '';

import app from '../../src/index';

const rawdata = fs.readFileSync('tests/integration/testData.json');
const userJSON = JSON.parse(rawdata);
var jwToken = '';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      //clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      //clearCollections();
    }

    done();
  });

  describe('Post/registration API', () => {
     /* it('if valid details recieved should save in db', (done) => {
      const userData = userJSON.UserData1;
      console.log(userData)
      request(app)
        .post('/api/v1/users/register')
        .send(userData)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.message).to.be.equal('User registerd successfully');
          done();
        });
    })  */
    it('if invalid email sent it will give error 400 Bad Request', (done) => {
      const userData = userJSON.UserData2;
      request(app)
        .post('/api/v1/users/register')
        .send(userData)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.message).to.be.equal('\"email\" must be a valid email');
          done();
        });
    })
    it('if already registered email sent it will give error 500', (done) => {
      const userData = userJSON.UserData3;
      request(app)
        .post('/api/v1/users/register')
        .send(userData)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(500)
          done();
        });
    })
    it('if invalid firstname sent it will give error 404 Bad Request', (done) => {
      const userData = userJSON.UserData4;
      request(app)
        .post('/api/v1/users/register')
        .send(userData)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.message).to.be.equal('\"firstName\" length must be at least 3 characters long');
          done();
        });
    }),
      it('if invalid lastname sent will give error 400 Bad Request', (done) => {
        const userData = userJSON.UserData5;
        request(app)
          .post('/api/v1/users/register')
          .send(userData)
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(400);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('\"lastName\" length must be at least 3 characters long');
            done();
          });
      }),
      it('if invalid password sent will give error 400', (done) => {
        const userData = userJSON.UserData6;
        request(app)
          .post('/api/v1/users/register')
          .send(userData)
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(400);
            expect(res.body.success).to.be.equal(false);
            expect(res.body.message).to.be.equal('\"password\" length must be at least 8 characters long');
            done();
          });
      })
  })

  describe('Post/login API', () => {
    it('if valid email and password sent should login', (done) => {
      const userData = userJSON.LoginData1;
      request(app)
        .post('/api/v1/users/login')
        .send(userData)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Successfully logged in');
          done();
        });
    }),
      it('if enter wrong email or wrong password it will not logged in', (done) => {
        const userData = userJSON.LoginData2;
        request(app)
          .post('/api/v1/users/login')
          .send(userData)
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Login failed');
            done();
          });
      })
  })
  describe('Forget password API', () => {
    it('if registered email sent should send mail', (done) => {
      const userData = userJSON.forgetPassData1;
      request(app)
        .post('/api/v1/users/forgetpassword')
        .send(userData)
        .end((err, res) => {
          if (err) {
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Mail Sent');
          done();
        });
    }),

      it('if invalid email received should not send mail, 404 Not found', (done) => {
        const userData = userJSON.forgetPassData2;
        request(app)
          .post('/api/v1/users/forgetpassword')
          .send(userData)
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(404);
            expect(res.body.message).to.be.equal('email not registered');
            done();
          });
      })

  })
  describe('ResetPassword API', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/forgetpassword')
        .send(userJSON.forgetPassData1)
        .end((err, res) => {
          jwToken = res.body.data.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent and valid password sent should update in db', (done) => {

      const userData = userJSON.resetPass1;
      request(app)
        .put('/api/v1/users/resetpassword')
        .set({ token: jwToken })
        .send(userData)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Reset Password successfully');

          done();
        });
    }),

      it('if non registered email send, 404 not found ', (done) => {
        const userData = userJSON.resetPass2;
        request(app)
          .put('/api/v1/users/resetpassword')
          .send(userData)
          .set({ token: jwToken })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(404);
            expect(res.body.message).to.be.equal('email not found');
            done();
          });
      }),
      it('if invalid token passes: 401 Unauthorized', (done) => {
        const userData = userJSON.resetPass1;
        request(app)
          .put('/api/v1/users/resetpassword')
          .send(userData)
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })

  })
  describe('Add Note API', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent with title, description: 201 created', (done) => {
      const userData = userJSON.addNote1;
      request(app)
        .post('/api/v1/notes/')
        .set({ token: jwtToken })
        .send(userData)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.message).to.be.equal('Note created successfully');
          done();
        });
    }),

      it('if invalid token pass : 401 Unauthorized ', (done) => {
        const userData = userJSON.addNote1;
        request(app)
          .post('/api/v1/notes/')
          .send(userData)
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      }),
      it('if title or description not given : 500 Internal server error', (done) => {
        const userData = userJSON.addNote2;
        request(app)
          .post('/api/v1/notes/')
          .send(userData)
          .set({ token: jwtToken })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(500);
            done();
          });
      })
  })
  describe('Get All Note API', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent : 200 Ok', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set({ token: jwtToken })
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('All notes fetched successfully');
          done();
        });
    }),
      it('if invalid token pass : 401 Unauthorized ', (done) => {
        request(app)
          .get('/api/v1/notes/')
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })
  })
  describe('Get Note by note_id API', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent with note id : 200 Ok', (done) => {
      const userData = userJSON.getNoteByID1;
      request(app)
        .get('/api/v1/notes/note_id')
        .set({ token: jwtToken })
        .send(userData)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Note fetched successfully');
          done();
        });
    }),
      it('if invalid token pass : 401 Unauthorized ', (done) => {
        const userData = userJSON.getNoteByID1;
        request(app)
          .get('/api/v1/notes/note_id')
          .send(userData)
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })
  })


  describe('Update Note by note_id API', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent with updated field : 202 Accepted', (done) => {
      const userData = userJSON.updateNote1;
      request(app)
        .put('/api/v1/notes/note:_id')
        .set({ token: jwtToken })
        .send(userData)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(202);
          expect(res.body.message).to.be.equal('Note updated successfully');
          done();
        });
    }),
      it('if invalid token pass : 401 Unauthorized ', (done) => {
        const userData = userJSON.updateNote1;
        request(app)
          .put('/api/v1/notes/note_id')
          .send(userData)
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })
  })


   /* describe('Delete Note By note_id', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent with note id : 200 Ok', (done) => {
      const userData = userJSON.deleteNoteByID1;
      request(app)
        .delete('/api/v1/notes/note_id')
        .set({ token: jwtToken })
        .send(userData)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Note deleted successfully');
          done();
        });
    }),
      it('if invalid token pass : 401 Unauthorized ', (done) => {
        const userData = userJSON.deleteNoteByID2;
        request(app)
          .delete('/api/v1/notes/note_id')
          .send(userData)
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })
  }) */


  describe('get all Archived Note by user_id', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent : 200 Ok', (done) => {
      request(app)
        .get('/api/v1/notes/note/isArchived')
        .set({ token: jwtToken })
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Fetched Archived Notes Sucessfully');
          done();
        });
    }),
      it('if invalid token pass : 401 Unauthorized ', (done) => {
        request(app)
          .get('/api/v1/notes/note/isArchived')
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })
  })

  describe('get all Deleteded Note by user_id', () => {
    beforeEach((done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userJSON.LoginData1)
        .end((err, res) => {
          jwtToken = res.body.data.UserDetails.token;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });

    it('if valid token sent : 200 Ok', (done) => {
      request(app)
        .get('/api/v1/notes/note/isDelete')
        .set({ token: jwtToken })
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.message).to.be.equal('Fetched Deleted Notes Sucessfully');
          done();
        });
    }),
      it('if invalid token pass : 401 Unauthorized ', (done) => {
        request(app)
          .get('/api/v1/notes/note/isDelete')
          .set({ token: "invalid token" })
          .end((err, res) => {
            if (err) {
              done();
            }
            expect(res.statusCode).to.be.equal(401);
            expect(res.body.message).to.be.equal('Authentication declined');
            done();
          });
      })
  })
})