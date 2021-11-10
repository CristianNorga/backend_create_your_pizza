//Requires
let express = require('express');
let cors = require('cors');
let conector = require('./src/server/conector.js');
let { ObjectId } = require('mongodb');
conector.getConnection();

// Inicializar configuracion
const app = express();


// middleware
app.use(cors());
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

// Routes
app.use('/tasks', require('./src/routes/tasks'));
app.use('/api/pqrs', require('./src/routes/pqrs'));
app.use('/ingredients', require('./src/routes/ingredients'));
app.use('/checks', require('./src/routes/checks'));



//static file
app.use(express.static(__dirname +'/public'));

// Lanzamiento del servidor
app.set('PORT', process.env.PORT || 3000);
app.listen(app.get('PORT'), () => {
	console.log(`Server started on port: ${app.get('PORT')}`);
});
