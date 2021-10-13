const user = 'proyectos';
const password = 'Misdatos1';
const dataBase = 'Pizza_Mia';
const cluster = 'cluster0';

let uri = `mongodb+srv://${user}:${password}@${cluster}.kxgwt.mongodb.net/${dataBase}?retryWrites=true&w=majority`;

exports.dbconfig = {
	uri: uri,
};
