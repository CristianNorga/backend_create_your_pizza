//Requires
const express = require("express");
const cors = require("cors");
// var bodyParser = require("body-parser");
const user = 'proyectos';
const password = 'Misdatos1';
const dataBase = 'Pizza_Mia';
const cluster = 'cluster0';
const { Ingredients } = require("./producto");

//Inicializacion variables necesarias
const app = express();
app.use(cors());
const port = 3001;

const { MongoClient } = require('mongodb');
const { listIngredients, listCondiments } = require("./dbSimulation");
const uri = `mongodb+srv://${user}:${password}@${cluster}.kxgwt.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

let dataMongo;
MongoClient.connect(
	uri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err, client) => {
		if (err) {
			return console.error(err);
		} else {
			console.log('Conexion a Atlas Exitoso');
			dataMongo = client.db("Pizza_Mia");
			db = client.db('Pizza_Mia')
			collectionCheck = db.collection('Pedidos')
			collectionSizes = db.collection('Sizes');
			collectionSauces = db.collection('Sauces');
			collectionCondiments = db.collection('Condiments');
		}
	}
);
//procesamiento de las peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function (req, res, next) {
  console.log(
    "--------------" +
      "\n" +
      "URL: " +
      req.url +
      "\n" +
      "Request method: " +
      req.method
  );
  next();
});

// GET Y UPDATE DE INGREDIENTES(DATOS ESTATICOS DEL RESTAURANTE) - update solo modifica la cantidad
app.get('/ingredients', function (req, res) {
	let sizes, sauces, condiments;
	dataMongo.collection("Sizes").find().toArray().then(result1 => {
		sizes = result1;
		dataMongo.collection('Sauces').find().toArray().then(result2 => {
			sauces = result2;
				dataMongo.collection('Condiments').find().toArray().then(result3 => {
						condiments = result3;
						let resultado = new Ingredients(sizes, sauces, condiments);
						res.status(200);
						res.json(resultado);
					}).catch(error => console.error(error));
			}).catch(error => console.error(error));
	}).catch(error=> console.error(error));
});

app.put('/ingredients/Sauces/:id', (req, res) => {
	collection
		.findOneAndUpdate(
			{ id: req.params.id },
			{
				$set: {
					quanty: req.body.quanty,
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

app.put('/ingredients/Condiments/:id', (req, res) => {
	collection
		.findOneAndUpdate(
			{ id: req.params.id },
			{
				$set: {
					quanty: req.body.quanty,
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

// CRUD CHECK 
app.post('/check', (req, res) => {
	collectionCheck.insertOne(req.body)
		.then((result) => {
			res.json('Success');
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
					pizzas: req.body.pizzas
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
