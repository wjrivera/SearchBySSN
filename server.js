var express = require('express');
var mongodb = require('mongodb');
var mongojs = require('mongojs');
var cons = require('consolidate');
var helmet = require('helmet');
var bodyParser = require('body-parser');

var app = express();

var db = mongojs('trace', ['people']);

app.use(express.static(__dirname + '/public'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.send(200);
});

app.post('/find', function (req, res) {
    console.log(req.body);
    db.people.find({ssn: req.body.ssn}, function (err, doc) {
        if(err) res.send(400);
        console.log(JSON.stringify(doc));
        res.json(doc);
    });

});

app.post('/findOne', function (req, res) {
    console.log("Find One: " +req.body._id);
    db.people.find({_id: new mongodb.ObjectID(req.body._id)}, function (err, doc) {
        if(err) res.send(400);
        console.log(JSON.stringify(doc));
        res.json(doc);
    });

});

app.post('/insertUser', function (req, res) {
    console.log("Insert One: " +  JSON.stringify(req.body));
    db.people.insert(req.body, function (err, doc) {
        if(err) res.send(400);
        console.log(JSON.stringify(doc));
        res.send(200);
    });

});

app.listen(3000);