var countries = require('../schema/countries');
var cities = require('../schema/cities');
const mongoose = require('mongoose');

exports.Countries = mongoose.model('Countries', countries.schema);
exports.Cities = mongoose.model('Cities', cities.schema);