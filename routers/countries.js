const Countries = require('../controllers/countries');
const express = require('express'); //import express

const router  = express.Router(); 

router.get('/countries', Countries.index); 

router.get('/saveCities', Countries.saveCities)
router.get('/saveIso', Countries.saveIso);
// router.get('/saveCountries', Countries.saveCountries)
router.get('/saveCityPrices', Countries.saveCityPrices);
router.get('/delete', Countries.deleteCity)

module.exports = router; // export to use in server.js