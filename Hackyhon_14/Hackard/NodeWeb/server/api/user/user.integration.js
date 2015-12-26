'use strict';

import app from '../..';
import User from './user.model';
import request from 'supertest';

describe('User API:', function() {
  var user;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.saveAsync();
    });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/users/me', function() {
    var token;

    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body._id.toString().should.equal(user._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });

  describe('POST /api/users/:id/events', function() {
    var agent;
    var token;
    before(function(done) {
      agent = request.agent(app);
      agent
      .post('/auth/local')
      .send({email: 'test@example.com', password: 'password'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        res.body.token.should.not.equal(null);
        res.body.token.should.not.equal(undefined);
        token = res.body.token;
        done();
      });
    });

    it('do post', function(done) {
      agent
      .get('/api/users/me')
      .set('authorization', 'Bearer ' + token)
      .then(function(res) {
        agent
        .post('/api/users/'+res.body._id+'/events')
        .set('authorization', 'Bearer ' + token)
        .send({title: 'asdsdsadasdfsdfa'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          res.body.length.should.equal(2);
          res.body[0].user.toString().should.equal(user._id.toString());
          res.body[0].title.should.equal('asdsdsadasdfsdfa');
          res.body[1].should.equal(1);
          agent
          .get('/api/users/'+user._id.toString()+'/events')
          .set('authorization', 'Bearer ' + token)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.body.length.should.equal(1);
            res.body[0].user.toString().should.equal(user._id.toString());
            res.body[0].title.should.equal('asdsdsadasdfsdfa');
            done();
          });
        });
      });
    });
  });
});
