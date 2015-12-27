'use strict';

import User from './user.model';
import Event from './event.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password')
    .then(users => {
      var promises = users.map(user => (
        new Promise((resolve, reject) => {
          Event.find({
            _id: {$in: user.events}
          }, (err, events) => {
            user.events = events;
            resolve(user);
          });
        })
      ));
      Promise.all(promises).then(users => {
        res.status(200).json(users);
      });
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function updateSetting(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  var nfc = String(req.body.nfc);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass || user.password;
        user.nfc = nfc || user.nfc;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Create a user's event
 */
export function createEvent(req, res, next) {
  var userId = req.user.role === 'admin' && req.params.id !== undefined ? req.params.id : req.user._id;
  var newEvent = new Event(req.body);
  newEvent.user = userId;
  newEvent.saveAsync()
    .then(event => {
      res.status(200).json(event);
    })
    .catch(validationError(res));
}

/**
 * Update event
 */
export function updateEvent(req, res, next) {
  var eventId = req.params.id;
  var skills = String(req.body.skills);

  Event.findByIdAsync(eventId)
    .then(event => {
      event.skills = skills;
      return event.saveAsync()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

/**
 * destroy a user's event
 */
export function destroyEvent(req, res, next) {
  Event.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 *
 */
export function getEvents(req, res, next) {
  var userId = req.user._id;
  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      Event.find({
        _id: {$in: user.events}
      }, (err, events) => {
        res.json(events);
      });
    })
    .catch(err => next(err));
}

/**
 *
 */
export function getEventById(req, res, next) {
  var userId = req.user._id;
  var eventId = req.params.eventId;
  Event.findOneAsync({
    _id: eventId,
    user: userId
  }).then(event => {
    if(!event) {
      return res.status(401).end();
    }
    res.json(event);
  })
  .catch(err => next(err));
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOneAsync({ _id: userId }, '-salt -password')
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      Event.find({
        _id: {$in: user.events}
      }, (err, events) => {
        user.events = events;
        res.json(user);
      });
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
