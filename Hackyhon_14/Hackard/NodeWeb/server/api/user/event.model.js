'use strict';

import crypto from 'crypto';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import {Schema} from 'mongoose';
import relationship from 'mongoose-relationship';

var EventSchema = new Schema({
  title: String,
  type: String,
  user: {type: Schema.ObjectId, ref:'User', childPath: 'events'},
  date: {type: Date, default: Date.now},
});
EventSchema.plugin(relationship, {relationshipPathName: 'user'});

export default mongoose.model('Event', EventSchema);
