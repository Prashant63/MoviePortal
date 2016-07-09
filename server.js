var express = require('express');
var app = express();


var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static(__dirname));
app.use(express.static(__dirname+'/controller'));
app.use(express.static(__dirname+'/controller/directive'));



                            //DATABASE START
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movie_portal');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Yayy!! Connected to Database');
});

var user = mongoose.Schema({
  "email":String,
  "password":String,
  "fav_movies":[]
});

var PortalUser = mongoose.model('PortalUser', user);

                            //DATABASE END



                            //ROUTING START
app.get('/users', function(req, res, next) {
	PortalUser.find(function (err, users) {
  if (err) return console.error(err);
  res.json(users);
  });
});

app.put('/users/add', function(req, res, next) {
  var user = req.body;
  var portalUser = new PortalUser(user);
  portalUser.save(function (err, portalUserDB) {
  if (err) {
    return console.error(err);
  }
  else{
    res.json(portalUserDB);
  }
  });
});

app.put('/users/:id',function(req,res,next) {
  var id = req.params.id;
  var fav_movies = req.body;
  PortalUser.findOneAndUpdate({_id:id},{fav_movies:fav_movies},{new: true},function(err,doc){
    res.json(doc);
  });  
});
                              //ROUTING END

app.listen(2000);