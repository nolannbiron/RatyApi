const Countries = require('../controllers/countries');
const Cities = require('../controllers/cities');
const express = require('express'); //import express

const router  = express.Router(); 

router.get('/countries', Countries.index);
router.get('/countries/:iso', Countries.findOne);
router.get('/getTrendingsCountries', Countries.getTrendingsCountries);
router.post('/getCountriesByContinent', Countries.getCountriesByContinent);

router.get('/cities', Cities.getAll);
router.post('/searchNearest', Cities.searchNearest);

module.exports = router