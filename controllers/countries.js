const models = require('../models');
const axios = require('axios');
const iso = require('iso-3166-1');

exports.index = function(req, res){
    models.Countries.find()
    .then((response) => {
        let data = response
        res.send(data)
    });
}

exports.findOne = function (req, res){
    const iso = req.params.iso;
    models.Countries.find({iso_alpha3: iso})
    .then((response) => {
        let data = response
        res.send(data[0])
    });
}

exports.getCountriesByContinent = async(req, res) => {

    let name = req.query.name;

    let countries = await models.Countries.find({"properties.continent": name}).sort({name: 1}).then(result => {return result});

    res.status(200).send(countries)
}


exports.getTrendingsCountries = async(req, res) => {

    let trendings = await models.Countries.find({"properties.trending": {$gt: 0}}).sort({"properties.trending": 1}).then(result => {return result});
    
    res.send(200, trendings);
}


// saveTrendingCountriesPic = async(req, res) => {

//     const trendings = await models.Countries.find({"properties.pic": null}).sort({"properties.trending": 1}).then(result => {return result});

//     for(trending of trendings){
        
//         const pic = await axios({
//             method: 'GET',
//             url: 'http://api.unsplash.com/search/photos?client_id=TmEcIUjWOXcrVw47OZjk5ln4E-m4FsknCrwiCQCQQSE&orientation=landscape&page=1&per_page=1&query='+trending.name_en,
//         }).then(function (response) {
//             return (response.data.results);
//         }).catch(function (error) {
//             console.error(error);
//         });
    
//         var query = {name_en: trending.name_en};
//         var update = {$set: {properties:{continent: trending.properties.continent, wikiDataId: trending.properties.wikiDataId, iso_alpha3: trending.properties.iso_alpha3, trending: trending.properties.trending, pic: pic[0].urls}}}
//         models.Countries.findOneAndUpdate(query, update, {upsert: true, useFindAndModify: true}, function(err, doc) {
//             if (err)  return console.log(err);
//         });

//     }

// }

// saveTrendingCountriesPic();



// exports.saveCountries = async(req, res) => {
//     let features = req.body.features;
//     for(const feature of features){
//         console.log(feature);
//         let name_en = feature.properties.ADMIN;
//         let name_fr = feature.properties.NAME_FR;
//         let continent = feature.properties.CONTINENT;
//         let iso_alpha3 = feature.properties.ADM0_A3_US;
//         let wikiDataId = feature.properties.WIKIDATAID;
        
//         var query = {name: name_fr};
//         var update = {$set: {name: name_fr, name_en: name_en, properties:{continent: continent, wikiDataId: wikiDataId, iso_alpha3: iso_alpha3}}}
//         models.Countries.findOneAndUpdate(query, update, {upsert: true, useFindAndModify: true}, function(err, doc) {
//             if (err)  return console.log(err);
//         });
//     }

//     res.send('ok');

// }


// exports.getCountryCode = async(req, res) => {


//     let countries = await models.Countries.find({}).then((response) => {return response});

//     for(const country of countries){   
//         let promise = await new Promise(r => setTimeout(r, 2000));
//         const codes = await axios({
//             method: 'GET',
//             url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries',
//             params: {namePrefix: country.country},
//             headers: {
//             'x-rapidapi-key': '5a280654b8msh299b14289f70df3p11f0b5jsnd966d6617889',
//             'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
//             }
//         }).then(function (response) {
//             return (response.data.data);
//         }).catch(function (error) {
//             console.error(error);
//         });

//         if(codes.length > 0){
//             let code = codes[0].wikiDataId;
//             var query = {country: country.country, wikiDataId: null};
//             models.Countries.findOneAndUpdate(query, { $set: { wikiDataId: code } }, {upsert: true, useFindAndModify: true}, function(err, doc) {
//                 if (err)  return console.log(err);
//             });
//         }
        
//     }

    
// }

// exports.saveNumbeo = async(req, res) => {

//     let countries = await models.Countries.find({}).then((response) => {return response});
//     for(const country of countries){
//         let crimes = await axios.get('https://numbeo.com/api/country_crime?api_key=5av1ntqnc95rfs&country='+country.name_en)
//         .then(function(response){
//             let data = response.data
//             return data
//         }).catch(function(e){
//             console.log(e);
//         })

//         let prices = await axios.get('https://numbeo.com/api/country_prices?api_key=5av1ntqnc95rfs&currency=USD&country='+country.name_en)
//         .then(function(response){
//             let data = response.data
//             return data.prices
//         }).catch(function(e){
//             console.log(e);
//         })

//         let pollution = await axios.get('https://numbeo.com/api/country_pollution?api_key=5av1ntqnc95rfs&country='+country.name_en)
//         .then(function(response){
//             let data = response.data
//             return data
//         }).catch(function(e){
//             console.log(e);
//         })

//         let indices = await axios.get('https://numbeo.com/api/country_indices?api_key=5av1ntqnc95rfs&country='+country.name_en)
//         .then(function(response){
//             let data = response.data
//             return data
//         }).catch(function(e){
//             console.log(e);
//         })

//         var query = {name_en: country.name_en};
//         models.Countries.findOneAndUpdate(query, { $set: { country_data:{numbeo: {crimes: crimes, prices: prices, indices: indices, pollution: pollution}}}}, {upsert: true, useFindAndModify: true}, function(err, doc) {
//             if (err) console.log(err);
//         });
        
//     }
//     res.send('ok');
// }


// exports.savePollution = async(req, res) => {

//     let countries = await models.Countries.find({}).then((response) => {return response});
//     for(const country of countries){
//         let pollution = await axios.get('https://numbeo.com/api/country_pollution?api_key=5av1ntqnc95rfs&country='+country.country)
//         .then(function(response){
//             let data = response.data
//             return data
//         }).catch(function(e){
//             console.log(e);
//         })

//         var query = {country: country.country};
//         models.Countries.findOneAndUpdate(query, { $set: { pollution: pollution } }, {upsert: true, useFindAndModify: true}, function(err, doc) {
//             if (err)  return res.json(err);
//         });
        
//     }
//     res.send('ok');
// }

// exports.saveIndices = async(req, res) => {

//     let countries = await models.Countries.find({}).then((response) => {return response});
//     for(const country of countries){
//         let indices = await axios.get('https://numbeo.com/api/country_indices?api_key=5av1ntqnc95rfs&country='+country.country)
//         .then(function(response){
//             let data = response.data
//             return data
//         }).catch(function(e){
//             console.log(e);
//         })

//         var query = {country: country.country};
//         models.Countries.findOneAndUpdate(query, { $set: { indices: indices } }, {upsert: true, useFindAndModify: true}, function(err, doc) {
//             if (err)  return res.json(err);
//         });
        
//     }
//     res.send('ok');
// }


// exports.saveCountries = async (req, res) => {

//     let countries = await axios.get('https://numbeo.com/api/country_prices?api_key=5av1ntqnc95rfs')
//     .then(function(response){
//         let data = response.data
//         return data.supported_countries
//     }).catch(function(e){
//         console.log(e);
//     })

//     countries.forEach((item) => {
//         var query = {country: item};
//         models.Countries.findOneAndUpdate(query, { $setOnInsert: { country: item } }, {upsert: true, useFindAndModify: true}, function(err, doc) {
//             if (err)  return res.json(err);
//         });
//     })

//     let prices = await saveCountryPrices(countries)
//     return res.send(200, prices)
// }


// const saveCountryPrices = async(countries, res) => {
//     for(const value of countries){
//         let prices = await axios.get('https://numbeo.com/api/country_prices?api_key=5av1ntqnc95rfs&currency=USD&country='+value)
//         .then(function(response){
//             let data = response.data
//             return data
//         }).catch(function(e){
//             return ''
//         })
//         var query = {country: value};
//         var update = {$set: {prices: prices.prices}}
//         models.Countries.findOneAndUpdate(query, update, {upsert: true, new: true, useFindAndModify: false}).then(function(response){
//             return response
//         }).catch(function(e){
//             console.log(e)
//         });
//     }
// }