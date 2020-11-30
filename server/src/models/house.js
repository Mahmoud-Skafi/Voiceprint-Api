const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseschema = new Schema({
  name: { type: String, required: true, trim: true },
  light: {type:Boolean, required: true},
  door: {type:Boolean, required: true},
  temp: {type:Number, required: true},
});

module.exports = mongoose.model('houses', houseschema);