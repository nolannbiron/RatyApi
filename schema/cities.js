const mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

const Schema = mongoose.Schema;
var PricesSchema = mongoose.Schema;
const LocSchema = mongoose.Schema;

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

const pricesSchema = new PricesSchema({
    average_price: Number,
    item_name: String,
    highest_price:Number,
    item_id:Number,
    lowest_price: Number,
    data_points: Number
})

exports.schema = new Schema({
    country: String,
    country_code: String,
    name: String,
    population: Number,
    loc: {
        type: pointSchema,
        required: true,
        index: '2dsphere'
    },
    city_data: {
      numbeo: {
          crimes: {},
          pollution: {},
          indices: {},
          prices: []
      }
  },
})