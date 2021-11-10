const express = require('express');
const router = express.Router();
let conector = require('../server/conector.js');

// INGREDIENTS
router.get('/', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = ['Sizes', 'Sauces', 'Condiments'];
		let ingredientsGet = await conector.findIngredients(dbname, collectionName);
		// console.log(ingredientsGet)
		if (Object.keys(ingredientsGet).length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.send({
				response: 'ok',
				data: ingredientsGet,
			});
		}
	} catch (err) {
		res.status(500);
		res.send({
			response: 'error',
			data: err,
		});
	}
});
