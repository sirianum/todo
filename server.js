/**
 * Created by smupp00 on 9/23/16.
 */

var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var port = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Todo API Root')
});

//GET /todos completed=false&q=work
app.get('/todos', function(req,res) {
    var query = req.query;

    var whereClause = {};

    if(query) {

        if (query.hasOwnProperty('completed') && query.completed === 'true') {
            whereClause.completed = true;
        } else if (query.hasOwnProperty('completed') && query.completed === 'false') {
            whereClause.completed = false;
        }

        if (query.hasOwnProperty('description') && query.description.length > 0) {
            //Look for items with description containing <queryParams.description>
            whereClause.description = {
                $like: "%" + query.description + "%"
            }
        }
    }

    console.log("whereClause : " );
    console.log(whereClause);

    db.todo.findAll ({
        where: whereClause
    }).then(
        function(todos) {
            todos.forEach(function(todo) {
                if(todo) {
                    console.log(todo.toJSON());
                    //res.json(todo.toJSON());
                }
            });
            res.json(todos);
        },
        function(e){
            res.status(500).send();
        }
    );
});

app.get('/todos/:id', function(req,res) {

    var todoId = parseInt(req.params.id);

    db.todo.findById(todoId).then(function(todo) {
        if(todo) {
            //console.log(todo.toJSON());
            res.json(todo.toJSON());
        } else {
            console.log('Todo not found')
            res.status(404).send();
        }
    },function(e){
        console.log("Server side problem.")
        res.status(500).send();
    });

});

//POST /todos
app.post('/todos', function(req,res) {
    var body = req.body;

    body = _.pick(body, 'description', 'completed')

    db.todo.create(body).then(function (todo) {
        res.json(todo.toJSON());
    },function(e) {
        res.status(400).json(e)
    });
});

//DELETE todos:id
app.delete('/todos/:id', function(req,res) {
    //_.without (todos, matchedtodo) -- returns new array without the matched todo.

    var todoId = parseInt(req.params.id);

    db.todo.destroy({
        where : {
            id: todoId
        }
    }).then (
        function(rowsDeleted)  {
            if(rowsDeleted === 0) {
                //No rows were deleted, meaning no matching todo;
                res.status(400).json({
                    error:'No todo with id'
                });
            } else {
                //Everything worked, but no data to send back

                res.status(204).send();
            }
        },
        function(e) {
            res.status(500).send();
        }
    );
})

//UPDATE todos:id
app.put('/todos/:id', function(req,res) {
    var todoId = parseInt(req.params.id);
    var body = req.body;
    body = _.pick(body, 'description', 'completed')

    console.log("body after picking the correct attributes : ");
    console.log(body);

    var attributes = {};

    if (body.hasOwnProperty('completed')) {
        console.log("Adding completed attribute to valid attributes ");
        attributes.completed = body.completed;
    }

    if(body.hasOwnProperty('description')) {
        attributes.description = body.description;
    }

    console.log("attributes : ");
    console.log(attributes);

    db.todo.findById(todoId).then(
        function(todo) {
            if(todo) {
                todo.update(attributes).then(
                    function(todo){
                        res.json(todo.toJSON());
                    },
                    function(e) {
                        res.status(400).json(e);
                    }
                );
            }else {
                res.status(404).send();
            }
        },
        function(e) {
            res.status(500).send()
        }
    );
});


db.sequelize.sync().then(function() {
    app.listen(port, function() {
        console.log("Listening on " + port);
    })
});

