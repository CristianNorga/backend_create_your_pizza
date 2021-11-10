//includes
let connection = undefined;
let { dbconfig } = require('./dbconfig.js');
let { MongoClient } = require('mongodb');
let { Ingredients } = require('../models/producto');

function connect() {
	return MongoClient.connect(dbconfig.uri);
}

exports.connect = connect;

async function getConnection() {
	if (connection) {
		return connection;
	}
	connection = await connect();
	console.log('Connection stablished');
	return connection;
}

exports.getConnection = getConnection;

async function getCollection(dbName, collectionName) {
	var connection = await getConnection();
	return connection.db(dbName).collection(collectionName);
}

exports.getCollection = getCollection;

export async function getCollections(dbName, collectionName) {
  var connection = await getConnection();
  let collections = {}
  for (x in collectionName){
    console.log('x:' + collectionName);
    collections[collectionName[x]] = connection.db(dbName).collection(collectionName[x]);
  }

  return collections;
}

async function findIngredients(dbName, collectionName) {

	var sizes = await getCollection (dbName, collectionName[0]);
	var sauces = await getCollection(dbName, collectionName[1]);
	var condiments = await getCollection(dbName, collectionName[2]);

	let resultado = new Ingredients(
		await sizes.find().toArray(),
		await sauces.find().toArray(),
		await condiments.find().toArray()
	);
	return resultado;
}

exports.findIngredients = findIngredients;

async function findDocuments(dbName, collectionName, filter) {
	var collection = await getCollection(dbName, collectionName);
	var cursor = collection.find(filter).limit(50);
	var listaResultado = [];
	var item = await cursor.next();
	do {
		if (item) {
			listaResultado.push(item);
			item = await cursor.next();
		}
	} while (item != null);
	return listaResultado;
}

exports.findDocuments = findDocuments;

async function addDocument(dbName, collectionName, document) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.insertOne(document);
	return result;
}

exports.addDocument = addDocument;

async function addDocuments(dbName, collectionName, documents) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.insertMany(documents);
	return result;
}

exports.addDocuments = addDocuments;

async function deleteDocuments(dbName, collectionName, filter) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.deleteMany(filter);
	return result;
}

exports.deleteDocuments = deleteDocuments;

async function updateDocument(dbName, collectionName, filter, updateObject) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.updateOne(filter, updateObject);
	return result;
}

exports.updateDocument = updateDocument;
