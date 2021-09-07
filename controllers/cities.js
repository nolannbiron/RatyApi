const models = require('../models');
const axios = require('axios');

exports.getAll = function(req, res){
    models.Cities.find({})
    .then((response) => {
        let data = response
        res.json(data)
    });
}

exports.searchNearest = async(req, res) => {
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
   // const distance = req.body.radius;
    const nearest = await models.Cities.find({
           "loc": {
             $near: {
               $geometry: {
                  type: "Point" ,
                  coordinates: [ longitude, latitude ]
               },
               $maxDistance: 1000000
             }
           },
    }).limit(100).then((response) => {return response})

    res.send(nearest);
}

exports.getTrendingsCities = async(req, res) => {

    let cities = await models.Cities.deleteMany({'city_data.numbeo.indices.error': {$exists: "Couldn't resolve"}}).then(response => {return response})

    console.log(cities)
} 

//GET CITIES FROM NUMBEO AND THENGET POPUPLATION WITH GEODB AFTER THAT => SORT BY POPULATIO

// exports.saveCities = async(req, res) => {


//   let countries = await models.Countries.find({}).then((response) => {return response});

//   for(const country of countries){   
//       let promise = await new Promise(r => setTimeout(r, 500));
//       const cities = await axios({
//           method: 'GET',
//           url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
//           params: {
//               limit: '15',
//               countryIds: country.properties.wikiDataId,
//               minPopulation: '50000',
//               sort: '-population',
//               types: 'CITY'
//           },
//           headers: {
//               'x-rapidapi-key': '5a280654b8msh299b14289f70df3p11f0b5jsnd966d6617889',
//               'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
//           }
//       }).then(function (response) {
//           return (response.data.data);
//       }).catch(function (error) {
//           return error;
//       });

//       if(cities.length > 0){
//           for(const city of cities){
//                var query = {name: city.name};
//               models.Cities.findOneAndUpdate(query, { $set: { name: city.name, country: city.country, country_code: city.countryCode, population: city.population, loc: {type: "Point", coordinates: [city.longitude, city.latitude]}}}, {upsert: true, useFindAndModify: true}, function(err, doc) {
//                   if (err)  return console.log(err);
//               });
//           }
      
//       }
//   }
      
//   res.send('ok');
  
// }

// saveCityPrices = async (req, res) => {

//   	let cities = await models.Cities.find({"city_data.numbeo.crimes": null}).then(res => {return res});
//   	for(const city of cities){
    
//         let crimes = await axios.get('https://numbeo.com/api/country_crime?api_key=5av1ntqnc95rfs&country='+city.country)
//         .then(function(response){
// 			let data = response.data
// 			return data
// 		}).catch(function(e){
// 			console.log(e);
// 		})
  
// 		// let prices = await axios.get('https://numbeo.com/api/country_prices?api_key=5av1ntqnc95rfs&currency=USD&country='+city.country)
// 		// .then(function(response){
// 		// 	let data = response.data
// 		// 	return data.prices
// 		// }).catch(function(e){
// 		// 	console.log(e);
// 		// })
  
// 		let pollution = await axios.get('https://numbeo.com/api/country_pollution?api_key=5av1ntqnc95rfs&country='+city.country)
// 		.then(function(response){
// 			let data = response.data
// 			return data
// 		}).catch(function(e){
// 			console.log(e);
// 		})

// 		// let indices = await axios.get('https://numbeo.com/api/indices?api_key=5av1ntqnc95rfs&query='+city.country)
// 		// .then(function(response){
// 		// 	let data = response.data
// 		// 	return data
// 		// }).catch(function(e){
// 		// 	console.log(e);
// 		// })
  
//           var query = {name: city.name};
//           models.Cities.findOneAndUpdate(query, { city_data:{numbeo: {crimes: crimes, pollution: pollution}}}, {upsert: true, useFindAndModify: true}, function(err, doc) {
//               if (err) console.log(err);
//           });
//       }

//     res.send('ok');
// }


// saveCityPrices();