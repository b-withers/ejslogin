var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var User = require('./models/user');

var app = express();


mongoose.connect('mongodb://root:abc123@ds119449.mlab.com:19449/ecommerce', function(err) {
    if (err){
        console.log(err);
    } else{
        console.log("Connected to the database");
    }
});

//Middleware logging in console
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs'); 


app.post('/create-user', function(req, res, next){
    var user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
        if (err) next(err);

        res.json('Created new user');
    });
});

app.get('/', function(req, res){
    res.render('home');
});



app.listen(3000, function(err){
    if (err) throw err;
    console.log("Server is Running on Port 3000")
});

