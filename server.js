/**
 * Created by smupp00 on 9/23/16.
 */

var express = require('express')
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req,res){
    res.send('Todo API Root')
});

app.listen(port, function(){
    console.log("Listening on " + port);
})