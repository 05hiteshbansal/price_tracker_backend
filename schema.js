var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const trackSchema = new mongoose.Schema({
    email:String ,
    price:Number ,
    url:String
  });

 module.exports = mongoose.model('tracker', trackSchema);