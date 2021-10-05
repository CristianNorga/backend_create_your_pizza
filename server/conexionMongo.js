const { MongoClient } = require("mongodb");
const { user, password, cluster, dataBase } = require("./const");

const clientCreateDB = () => {
  const uri = `mongodb+srv://${user}:${password}@${cluster}.ctsee.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
};

export default { clientCreateDB };
