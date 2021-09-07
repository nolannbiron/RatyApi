const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var CitiesSchema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const citiesSchema = new CitiesSchema({
    name: String,
    loc: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    population: Number
})

exports.schema = new Schema({
    name: String,
    name_en: String,
    properties: {
        continent: String,
        iso_alpha3: String,
        wikiDataId: String,
        trending: Number,
        pic: {}
    },
    country_data: {
        numbeo: {
            crimes: {},
            pollution: {},
            indices: {},
            prices: []
        }
    },
    cities: [citiesSchema]
});