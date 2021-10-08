//Requires
import express from 'express';
import cors from 'cors';
import * as conector from './server/conector.js';
import { ObjectId } from 'mongodb';
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

app.get('/checks', async function (req, res) {
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

app.get('/check', async function (req, res) {
  let dbname = 'Pizza_Mia';
  let collectionName = 'Pedidos';
	try {
		// delete req.query['_'];
    console.log(req.query)
		let checkGet = await conector.findDocuments(dbname, collectionName, {
			_id: new ObjectId(req.query._id),
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

app.put('/check', async function (req, res) {
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
					// quanty: req.body.quanty,
					confirmed: req.body.confirmed,
					// totalValue: req.body.totalValue,
					// select: req.body.select,
					// pizzas: req.body.pizzas,
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

app.delete('/check', async function (req, res) {
	try {
    let dbname = 'Pizza_Mia';
    let collectionName = 'Pedidos';
		let _id = req.body._id;
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

//Lanzamiento del servidor
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
