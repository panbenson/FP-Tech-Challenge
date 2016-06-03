/*
 * Serve JSON to our AngularJS client
 */
var express     = require('express');
var https       = require('https');
var q           = require('q');
var api         = express.Router();
var db          = require('../config/db').connection;

// API endpoint for /api/apparel
api.get('/api/apparel/:styleCode?', function(req, res) {
	// Insert Apparel API code here
	db.query('SELECT DISTINCT * from apparel group by style_code', function(err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	});
});

// API endpoint for /api/quote
api.post('/api/quote', function(req, res) {
	// console.log(req.body.sr, req.body.cc, req.body.sc);
	var apparelPrice = getApparelPrice(req.body.sr, req.body.cc, req.body.sc)
	.then(function(value){
		res.send(value);
	});
});

// Function for making an Inventory API call
var getApparelPrice = function getPrice(style_code, color_code, size_code) {
	var	apparelPriceDeferred = q.defer();
	// Format the Inventory API endpoint as explained in the documentation
	var link = 'https://www.alphashirt.com/cgi-bin/online/xml/inv-request.w?sr='+
	          style_code+'&cc='+color_code+'&sc='+size_code+
	          '&pr=y&zp=10002&userName=triggered1111&password=triggered2222';

	//console.log("Accessing: " + link); // verify link

	https.get(link, function(res) {
		res.on('data', function (data) {
			// Parse response XML data here
			var response = data.toString();
			var price;
			if (response.indexOf(' price="') != -1)
				price = response.substring(response.indexOf(' price="') + 9,
				                           response.indexOf('"',response.indexOf(' price="') + 8));
			apparelPriceDeferred.resolve(price);
		});
	}).on('error', function(error) {
		// Handle EDI call errors here
		apparelPriceDeferred.reject('unable to retrieve');
	});

	return apparelPriceDeferred.promise;
}

module.exports = api;
