/**
 * Created by smupp00 on 9/23/16.
 */

var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

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

    var todoId = parseInt(req.params.id);
    var matchToDo = _.findWhere(todos, {id: todoId});

    console.log("matchToDo : " + matchToDo);

    if(matchToDo) {
        res.json(matchToDo)
    } else {
        res.status(404).send();
    }

});

//POST /todos
app.post('/todos', function(req,res) {
    var body = req.body;

    body = _.pick(body, 'description', 'completed')

    if(! _.isBoolean(body.completed) || ! _.isString(body.description) || body.description.trim().length === 0) {
        res.status(400).send()
    } else {
        console.log("Adding to todo array : ");
        body.id = todoNextId;
        body.description = body.description.trim();
        console.log(body);
        todos.push(body);
        todoNextId++;
        res.json(body);
    }
});

//DELETE todos:id
app.delete('/todos/:id', function(req,res) {
    //_.without (todos, matchedtodo) -- returns new array without the matched todo.

    var todoId = parseInt(req.params.id);
    var matchToDo = _.findWhere(todos, {id: todoId});

    console.log("matchToDo : " + matchToDo);

    if (matchToDo) {
        todos = _.without(todos, matchToDo)
        res.json(matchToDo);
    } else {
        //No matching item found to delete.
        res.status(404).json({"error" : "No todo item found with that id"});
    }
})

//UPDATE todos:id
app.put('/todos/:id', function(req,res) {
    var todoId = parseInt(req.params.id);
    var matchToDo = _.findWhere(todos, {id: todoId});

    console.log("matchToDo : " + matchToDo);

    if(!matchToDo) {
        return res.status(404).send();
    }

    var body = req.body;
    body = _.pick(body, 'description', 'completed')

    console.log("body after picking the correct attributes : ");
    console.log(body);

    valid_attributes = {};

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        console.log("Adding completed attribute to valid attributes ");
        valid_attributes.completed = body.completed;
    }else if(body.hasOwnProperty('completed')) {
        return res.status(404).json({"error" : "completed attribute doesn't follow standard"});
    }

    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length != 0) {
        valid_attributes.description = body.description;
    }else if(body.hasOwnProperty('description')) {
        //Property provided but didn't meet standard
        return res.status(404).json({"error" : "description attribute doesn't follow standard"});
    }

    console.log("valid_attributes : ");
    console.log(valid_attributes);

    //We have something to update.
    //Update matchToDo with values from valid_attributes.
    _.extend(matchToDo, valid_attributes);
    res.json(matchToDo);
});


app.listen(port, function(){
    console.log("Listening on " + port);
})