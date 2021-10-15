//Requires
let express = require('express');
let cors = require('cors');
let conector = require('./server/conector.js');
let { ObjectId } = require('mongodb');
conector.getConnection();

// Inicializar configuracion
const app = express();
app.use(cors());

// middleware
app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, ContentType, Accept'
// 	);
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// 	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//procesamiento de las peticiones
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CRUD CHECK
app.post('/user', async function (req, res) {
	try {
    let dbname = "Pizza_Mia";
    let collectionName = 'Usuarios';
		let checkCreated = await conector.addDocument(dbname, collectionName, {
			nombreCompleto: req.body.nombreCompleto,
			email: req.body.email,
			usuario: req.body.usuario,
			direccion: req.body.direccion,
			password: req.body.password,
			phone: req.body.phone,
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

app.get('/users', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Usuarios';
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

app.get('/user', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Usuarios';
		// delete req.query['_'];
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

app.put('/user', async function (req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'Usuarios';
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

app.delete('/check', async function (req, res) {
	try {
    let dbname = 'Pizza_Mia';
    let collectionName = 'Usuarios';
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

//static file
app.use(express.static(__dirname +'/public'));

// Lanzamiento del servidor
app.set('PORT', process.env.PORT || 3000);
app.listen(app.get('PORT'), () => {
	console.log(`Server started on port: ${app.get('PORT')}`);
});
