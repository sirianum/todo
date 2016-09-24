/**
 * Created by smupp00 on 9/23/16.
 */

var express = require('express')
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Todo API Root')
});

app.get('/todos', function(req,res) {
    res.json(todos);
});

app.get('/todos/:id', function(req,res) {

    var todoId = req.params.id;
    var matchToDo = undefined;

    console.log("Looking for id " + todoId);

    for(i = 0; i< todos.length; i++) {
        if (todos[i] && todos[i].id === parseInt(todoId)) {
            matchToDo = todos[i];
        }
    }
    if(matchToDo) {
        res.json(matchToDo)
    } else {
        res.status(404).send();
    }

});

//POST /todos
app.post('/todos', function(req,res) {
    var body = req.body;
    if(body) {
        body.id = todoNextId;
        todos[todoNextId] = body;
        todoNextId++;
        console.log('description');
        res.json(body);
    }
});


app.listen(port, function(){
    console.log("Listening on " + port);
})