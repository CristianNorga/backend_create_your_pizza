//includes
import { dbconfig } from './dbconfig.js';
import { MongoClient } from 'mongodb';
import { Ingredients } from './producto.js';


export function connect() {
	return MongoClient.connect(dbconfig.uri);
}

export async function getConnection() {
	var connection = await connect();
	console.log('Connection stablished');
	return connection;
}

export async function getCollection(dbName, collectionName) {
	var connection = await getConnection();
	return connection.db(dbName).collection(collectionName);
}

// export async function getCollections(dbName, collectionName) {
//   var connection = await getConnection();
//   let collections = {}
//   for (x in collectionName){
//     console.log('x:' + collectionName);
//     collections[collectionName[x]] = connection.db(dbName).collection(collectionName[x]);
//   }

//   return collections;
// }

export async function findIngredients(dbName, collectionName) {
  var connection = await getConnection();

	var sizes = await connection.db(dbName).collection(collectionName[0]);
	var sauces = await connection.db(dbName).collection(collectionName[1]);
	var condiments = await connection.db(dbName).collection(collectionName[2]);

	let resultado = new Ingredients(
		await sizes.find().toArray(),
		await sauces.find().toArray(),
		await condiments.find().toArray()
	);
	return resultado;
}

export async function findDocuments(dbName, collectionName, filter) {
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

export async function addDocument(dbName, collectionName, document) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.insertOne(document);
	return result;
}

export async function addDocuments(dbName, collectionName, documents) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.insertMany(documents);
	return result;
}

export async function deleteDocuments(dbName, collectionName, filter) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.deleteMany(filter);
	return result;
}

export async function updateDocument(dbName, collectionName, filter, updateObject) {
	var collection = await getCollection(dbName, collectionName);
	var result = await collection.updateOne(filter, updateObject);
	return result;
}
// export const conector = {
// 	uri: uri,
// };
// module.exports = {
// 	// findDocuments,
// 	addDocument,
// 	deleteDocuments,
// 	addDocuments,
// 	updateDocument,
// 	findIngredients,
// };
