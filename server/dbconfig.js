const user = 'proyectos';
const password = 'Misdatos1';
const dataBase = 'Pizza_Mia';
const cluster = 'cluster0';

let uri = `mongodb+srv://${user}:${password}@${cluster}.kxgwt.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

// let connectionString =
// 	'mongodb+srv://admin:admin123@testcluster.g3d1z.mongodb.net/test?authSource=admin&replicaSet=atlas-fc3fqf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
// let credentials = {
// 	user: 'username',
// 	password: 'password--',
// };

export const dbconfig = {
	uri: uri,
};
