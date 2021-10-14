const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const connectionString = "mongodb+srv://proyectos:Misdatos1@cluster0.kxgwt.mongodb.net/Pizza_Mia?authSource=admin&replicaSet=atlas-106aw9-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true";
const nameDB = "Pizza_Mia";

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// completed
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: nameDB
});

var db = mongoose.connection;
db.on("open", () => {
    console.log("Connected to mongoDB");
});
db.on("error", error => {
    console.log(error);
});
// import todo schema as model
let todoModel = require("./todo_schema");

// ROUTES

app.get("/", (req, res) => {
    res.send("welcome to home page");
});

// add todo
app.post("/todo/add", (req, res) => {
    let newTodo = new todoModel();
    newTodo.nombreCompleto = req.body.nombreCompleto;
    newTodo.completed = false;
    newTodo.email = req.body.email;
    newTodo.usuario = req.body.usuario;
    newTodo.direccion = req.body.direccion;
    newTodo.password = req.body.password;
    newTodo.phone = req.body.phone
    newTodo.save(err => {
        if (err) {
            console.log(err);
            res.send("Error while adding Todo. \n Error" + JSON.stringify(err));
        } else {
            console.log(newTodo);
            res.send("Todo added.  \n Error" + JSON.stringify(newTodo));
        }
    });
});
// FETCH TO-DO

// completed
app.get("/todo/completed", (req, res) => {
    todoModel.find({ completed: true },
        function(err, todos) {
            if (err) {
                res.send("Error while fetching Todos\n Error" + JSON.stringify(newTodo));
            } else {
                res.json(todos);
            }
        });
});

// uncompleted
app.get("/todo/uncompleted", (req, res) => {
    todoModel.find({ completed: false }, (err, todos) => {
        if (err) {
            res.send("Error while fetching Todos. \n Error" + JSON.stringify(newTodo));
        } else {
            res.json(todos);
        }
    });
});

// update
app.post("/todo/complete/:id", (req, res) => {
    todoModel.findByIdAndUpdate(
        req.params.id, { completed: true },
        function(err, todo) {
            if (!err) {
                res.send("Good Work");
            } else {
                res.send("Error while complete the todos \n Error " + JSON.stringify(err));
            }
        }
    );
});

// delete todo
app.delete("/todo/:id", (req, res) => {
    let query = { _id: req.params.id };
    todoModel.deleteOne(
        query,
        function(err) {
            if (err) {
                res.send("Error while deleting todo. \n Error" + JSON.stringify(newTodo));
            } else {
                res.send("Todo deleted. ");
            }
        });
});

app.set("PORT", process.env.PORT || 3001);
app.listen(app.get("PORT"), () => {
    console.log(`Server started on port: ${app.get("PORT")}`);
});