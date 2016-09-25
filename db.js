/**
 * Created by smupp00 on 9/24/16.
 */

var Sequilize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequilize;

if(env === 'production') {
    //Running on heroku
    sequilize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgress'
    })

}else {
    sequilize = new Sequelize(undefined,
        undefined,
        undefined,
        {
            'dialect': 'sqlite',
            'storage': __dirname + '/data/dev-todo-api.sqlite'
        });
}

var db = {};

db.todo = sequilize.import(__dirname + "/models/todo.js");
db.Sequelize = Sequilize;
db.sequelize = sequilize;

module.exports = db;