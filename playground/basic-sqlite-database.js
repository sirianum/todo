/**
 * Created by smupp00 on 9/24/16.
 */

var Sequilize = require('sequelize');
var sequilize = new Sequilize(undefined,
                              undefined,
                              undefined,
                             {
                                 'dialect': 'sqlite',
                                 'storage': __dirname + '/basic-sqlite-database.sqlite'
                             }
);

var Todo = sequilize.define('todo', {
    description :{
        type: Sequilize.STRING,
        allowNull: false,
        validate : {
            len:[1, 250]
        }
    },
    completed: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

sequilize.sync(
    {
       //force: true
    }).then(function() {
    console.log('Everything is synced');

    /*Todo.create({
        description: 'Take out trash'
    }).then(function (todo) {
        return Todo.create( {
            description : "Clean Office"
        });
    }).then (function() {
        //return Todo.findById(1);
        return Todo.findAll({
            where: {
                description:{
                    $like: "%office%"
                }
            }
        });
    }).then (function(todos) {
        if (todos) {
            todos.forEach(function(todo) {
                console.log(todo.toJSON());
            })
        } else {
            console.log("No todo found");
        }
    }).catch(function(e) {
        console.log(e);
    });*/

    Todo.findById(2).then(function(todo) {
        if(todo) {
            console.log(todo.toJSON());
        } else {
            console.log('Todo not found')
        }
    });


});