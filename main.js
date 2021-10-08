//Requires
import express from 'express';
import cors from 'cors';
import * as conector from './server/conector.js';
// var ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(cors());
const port = 8090;

//Inicializacion variables necesarias

  // console.log('Conexion a Atlas Exitoso');
  // dataMongo = client.db('Pizza_Mia');
  // db = client.db('Pizza_Mia');
  // collectionCheck = db.collection('Pedidos');
  // collectionSizes = db.collection('Sizes');
  // collectionSauces = db.collection('Sauces');
  // collectionCondiments = db.collection('Condiments');

//procesamiento de las peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
	console.log(
		'--------------' +
			'\n' +
			'URL: ' +
			req.url +
			'\n' +
			'Request method: ' +
			req.method
	);
	next();
});

// INGREDIENTS
app.get('/ingredients', async function (req, res) {
	try {
    let dbname = "Pizza_Mia";
    let collectionName = ["Sizes","Sauces","Condiments"];
		let productoGet = await conector.findIngredients(dbname, collectionName);
    console.log(productoGet)
		if (Object.keys(productoGet).length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.send({
				response: 'ok',
				data: productoGet,
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

// CRUD CHECK
app.post('/check', async function (req, res) {
	try {
    let dbname = "Pizza_Mia";
    let collectionName = 'Pedidos';
		let productCreated = await conector.addDocument(dbname, collectionName, {
			quanty: req.body.quanty,
			confirmed: req.body.confirmed,
			totalValue: req.body.totalValue,
			select: req.body.select,
			pizzas: req.body.pizzas,
		});
		res.status = 200;
		res.send({
			response: 'ok',
			data: productCreated,
		});
	} catch (err) {
		res.status = 500;
		res.send({
			response: 'error',
			data: JSON.stringify(err),
		});
	}
});

app.get('/checks', async function (req, res) {
	try {
    let dbname = 'Pizza_Mia';
    let collectionName = 'Pedidos';
		let productoGet = await conector.findDocuments(dbname, collectionName, {});
		if (productoGet.length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.send({
				response: 'ok',
				data: productoGet,
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

app.get('/check', async function (req, res) {
  let dbname = 'Pizza_Mia';
  let collectionName = 'Pedidos';
	try {
		delete req.query['_'];
		let productoGet = await conector.findDocuments(dbname, collectionName, {
			_id: new ObjectId(req.query._id),
		});
		if (productoGet.length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.send({
				response: 'ok',
				data: productoGet,
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




app.post('/check', (req, res) => {
	res.status = 200;
	res.send({
		response: 'ok',
		data: 'created',
	});
	// data[_id] = new ObjectId(req.query._id);
	// req.body["_id"] =
	// collectionCheck.insertOne(req.body)
	// 	.then((result) => {
	// 		res.json('Success');
	// 	})
	// 	.catch((error) => console.error(error));
});
app.get('/checks', (req, res) => {
	dataMongo
		.collection('Pedidos')
		.find()
		.toArray()
		.then((result) => {
			res.status(200);
			res.json(result);
		})
		.catch((error) => console.error(error));
});
app.get('/check/:id', (req, res) => {
	db
		.collection('Pedidos')
		.find({ id: req.params.id })
		.toArray()
		.then((results) => {
			res.json(results);
		})
		.catch((error) => console.error(error));
});
app.put('/check/:id', (req, res) => {
	collectionCheck
		.findOneAndUpdate(
			{ id: req.params.id },
			{
				$set: {
					quanty: req.body.quanty,
					confirmed: req.body.confirmed,
					totalValue: req.body.totalValue,
					select: req.body.select,
					pizzas: req.body.pizzas,
				},
			},
			{
				upsert: true,
			}
		)
		.then((result) => {
			res.json('Updated');
		})
		.catch((error) => console.error(error));
});
app.delete('/check/:id', (req, res) => {
	collectionCheck
		.deleteOne({ id: req.params.id })
		.then((result) => {
			res.json('Deleted');
		})
		.catch((error) => console.error(error));
});

//Lanzamiento del servidor
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
