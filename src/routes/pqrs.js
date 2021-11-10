const express = require('express');
const router = express.Router();
let conector = require('../server/conector.js');
let { Pqrs } = require('../models/Pqrs');
let { ObjectId } = require('mongodb');

// router.get('/',async(req, res)=>{
//   const tasks= await Task.find();
//     res.json(tasks);
// });
router.get('/', async function(req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'PQRS';
		let tasks = await conector.findDocuments(dbname, collectionName, {});
		if (tasks.length == 0) {
			res.status(404);
			res.send({
				response: 'error',
				data: 'Error no hay elementos.',
			});
		} else {
			res.status(200);
			res.json(tasks);
		}
	} catch (err) {
		res.status(500);
		res.send({
			response: 'error',
			data: err,
		});
	}
});



// router.get('/:id',async(req, res)=>{
//     const tasks= await Task.findById(req.params.id);
//       res.json(tasks);
//   });

// router.post('/', async (req, res) => {
// 	const pqrs = new Pqrs(req.body);
// 	await task.save();
// 	//console.log(task);
// 	res.json({
// 		status: 'guardado',
// 	});
// });

router.post('/', async function(req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'PQRS';
		const pqrs = new Pqrs(
			req.body.nombres,
			req.body.apellidos,
			req.body.contacto,
			req.body.correo,
			req.body.solicitud,
			req.body.tipo
		);
		let taskCreated = await conector.addDocument(dbname, collectionName, pqrs);
		res.status = 200;
		res.json({
			status: 'guardado',
		});
	} catch (err) {
		console.log(error);
		res.status = 500;
		res.send({
			response: 'error',
			data: JSON.stringify(err),
		});
	}
});

// router.put('/:id',async (req, res) =>{
//    await  Task.findByIdAndUpdate(req.params.id, req.body)
//    res.json({
//            status: 'Actualizado'
//        });
// });

// router.put('/', async function(req, res) {
// 	try {
// 		let dbname = 'Pizza_Mia';
// 		let collectionName = 'PQRS';
// 		let checkUpdated = await conector.updateDocument(
// 			dbname,
// 			collectionName,
// 			{
// 				_id: new ObjectId(req.body._id),
// 			},
// 			{
// 				$set: {
// 					quanty: req.body.quanty,
// 					confirmed: req.body.confirmed,
// 					totalValue: req.body.totalValue,
// 					select: req.body.select,
// 					pizzas: req.body.pizzas,
// 				},
// 			}
// 		);
// 		res.status(200);
// 		res.send({
// 			response: 'ok',
// 			data: checkUpdated,
// 		});
// 	} catch (err) {
// 		res.status(500);
// 		res.send({
// 			response: 'error',
// 			data: err,
// 		});
// 	}
// });

// router.delete('/:id',async (req, res) =>{
//     await Task.findByIdAndRemove(req.params.id)
//     res.json({
//             status: 'Eliminado'
//         });
//  });
router.delete('/', async function(req, res) {
	try {
		let dbname = 'Pizza_Mia';
		let collectionName = 'PQRS';
		let _id = req.query._id;
		let deleted = await conector.deleteDocuments(dbname, collectionName, {
			_id: new ObjectId(_id),
		});
		res.status(200);
		res.json({
			status: 'Eliminado'
		});
	} catch (err) {
		res.status(500);
		res.send({
			response: 'error',
			data: err,
		});
	}
});

module.exports=router;