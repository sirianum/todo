/**
 * Created by smupp00 on 9/24/16.
 */

var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';

var sequelize;

if(env === 'production') {
    //Running on heroku
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgress'
    })

}else {
    sequelize = new Sequelize(undefined,
        undefined,
        undefined,
        {
            'dialect': 'sqlite',
            'storage': __dirname + '/data/dev-todo-api.sqlite'
        });
}

var db = {};

db.todo = sequelize.import(__dirname + "/models/todo.js");
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;