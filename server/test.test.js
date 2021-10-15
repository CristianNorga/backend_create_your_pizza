// import { credentials } from './dbconfig';
// const { credentials } = require('dbconfig');
// const { dbconfig } = require('./dbconfig');
import { dbconfig } from './dbconfig.js';

// const uri = `mongodb+srv://${dbconfig.user}:${dbconfig.password}@${dbconfig.cluster}.kxgwt.mongodb.net/${dbconfig.dataBase}?retryWrites=true&w=majority`;


console.log(dbconfig.uri);