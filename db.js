/**
 * Created by smupp00 on 9/24/16.
 */

var Sequilize = require('sequelize');

var sequilize = new Sequilize(undefined,
    undefined,
    undefined,
    {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.sqlite'
    }
);

var db = {};

db.todo = sequilize.import(__dirname + "/models/todo.js");
db.Sequelize = Sequilize;
db.sequelize = sequilize;

module.exports = db;