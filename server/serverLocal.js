// app.get('/', (req, res) => {
// 	res.send('Hola Mundo');
// });

// const express = require("express"), ==> VA
//   app = express(), ==> VA
//   port = 3030; ==> VA
// http = require(),
// server = http.createServer(app),
// methodOverride = require("method-override");
// eslint-disable-next-line no-undef
// const mongodb = require("./conexionMongo");==> VA
// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/ingredients");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false })); ==> VA
// app.use(express.json()); ==> VA
// app.use(methodOverride());

// var router = express.Router();

// router.get('/', function (req, res) {
// 	res.send('Hello World!');
// });

// app.use(router);

// mongoose.connect('mongodb://localhost/ingredients', function (err, res) {
// 	if (err) {
// 		console.log('ERROR: connecting to Database. ' + err);
// 	}

// });

// try { ==> VA
//   mongodb.connect;
//   app.listen(port, function () {
//     console.log(`Node server running on http://localhost:${port}`);
//   });
//   // const collection = mongodb.db("sample_analytics").collection("customers");
// } catch (err) {
//   console.log("Error:" + err);
//   mongodb.close();
// }

/* ========================== */
/* ===      PROFESOR      === */
/* ========================== */

//Requires
const express = require("express");
const cors = require("cors");
// const path = require("path");
var bodyParser = require("body-parser");
var db = require("./dbSimulation");
//Inicializacion variables necesarias
const app = express();
app.use(cors());
const port = 3030;
//procesamiento de las peticiones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
// app.get("/", function (req, res) {
//   res.sendFile(path.resolve("./index.html"));
// });
//peticiones de la API
app.get('/ingredients', function (req, res) {
	let ingredients = db.listIngredients();
	if (ingredients == -1) {
		res.status(200);
		res.send({
			response: 'ok',
			data: 'No hay registros en la BD',
		});
	} else {
    console.log("ok")
		res.status(200);
		res.send({
			response: 'ok',
			data: ingredients,
		});
	}
});

//Lanzamiento del servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
