/**
 * Created by smupp00 on 9/23/16.
 */

var express = require('express')
var app = express();

var port = process.env.PORT || 3000;

var todos = [
    {
        id: 1,
        description: 'Meet mom for lunch',
        completed: false
    },
    {
        id: 2,
        description: 'Pick up groceries',
        completed: false
    },
    {
        id: 3,
        description: 'Fill Timesheet',
        completed: true
    }
];

app.get('/', function(req,res){
    res.send('Todo API Root')
});

app.get('/todos', function(req,res) {
    res.json(todos);
});

app.get('/todos/:id', function(req,res) {

    var todoId = req.params.id;
    var matchToDo = undefined;
    //res.send('Asking for todo with id of ' + todoId);
    //res.json(todos[id]);
    for(i = 0; i< todos.length; i++) {
        if (todos[i].id === parseInt(todoId)) {
            matchToDo = todos[i];
        }
    }
    if(matchToDo) {
        res.json(matchToDo)
    } else {
        res.status(404).send();
    }

});

app.listen(port, function(){
    console.log("Listening on " + port);
})