var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var irradianceSchema = new Schema({
  IrradTime: Date,
  SenNum: String,
  IrradValue: Number
});

var irradModel = mongoose.model('Irradiance', irradianceSchema);
module.exports = irradModel;
