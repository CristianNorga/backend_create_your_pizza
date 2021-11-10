const express = require('express');
const router = express.Router();
let conector = require('../server/conector.js');
let { ObjectId } = require('mongodb');

// CRUD CHECK
router.post('/', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Pedidos';
		let checkCreated = await conector.addDocument(dbname, collectionName, {
			quanty: req.body.quanty,
			confirmed: req.body.confirmed,
			totalValue: req.body.totalValue,
			select: req.body.select,
			pizzas: req.body.pizzas,
		});
		res.status = 200;
		res.send({
			response: 'ok',
			data: checkCreated,
		});
	} catch (err) {
		res.status = 500;
		res.send({
			response: 'error',
			data: JSON.stringify(err),
		});
	}
});

router.get('/', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Pedidos';
		let checksGet = await conector.findDocuments(dbname, collectionName, {});
		if (checksGet.length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.send({
				response: 'ok',
				data: checksGet,
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

router.get('/:id', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Pedidos';
		// delete req.query['_'];
		let checkGet = await conector.findDocuments(dbname, collectionName, {
			_id: new ObjectId(req.params.id),
			// _id: req.query._id,
		});
		if (checkGet.length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.send({
				response: 'ok',
				data: checkGet,
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

router.put('/', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Pedidos';
		// console.log(req.body._id)
		let checkUpdated = await conector.updateDocument(
			dbname,
			collectionName,
			{
				_id: new ObjectId(req.body._id),
			},
			{
				$set: {
					quanty: req.body.quanty,
					confirmed: req.body.confirmed,
					totalValue: req.body.totalValue,
					select: req.body.select,
					pizzas: req.body.pizzas,
				},
			}
		);
		res.status(200);
		res.send({
			response: 'ok',
			data: checkUpdated,
		});
	} catch (err) {
		res.status(500);
		res.send({
			response: 'error',
			data: err,
		});
	}
});

router.delete('/', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Pedidos';
		let _id = req.query._id;
		let deleted = await conector.deleteDocuments(dbname, collectionName, {
			_id: new ObjectId(_id),
		});
		res.status(200);
		res.send({
			response: 'ok',
			data: deleted,
		});
	} catch (err) {
		res.status(500);
		res.send({
			response: 'error',
			data: err,
		});
	}
});
