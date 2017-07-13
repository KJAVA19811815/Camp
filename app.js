const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");

var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));

//schema setup
var campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String
})

var Campground = mongoose.model("Campground", campgroundsSchema);

// Campground.create({
//   name: 'Hogwarts',
//   image: 'https://images.pottermore.com/bxd3o8b291gf/2phT56DSucuUqU6Icm6mCe/b1fd2811691e41ffd1622a07eb528604/HogwartsCastle_WB_F4_HogwartsThroughTheTrees_Illust_100615_Land.jpg?w=1200'
// }, function(err, campground){
//   if(err) {
//     console.log("there was an error")
//   } else {
//     console.log(campground);
//   }
// })

app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log("error")
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds})
    }
  })
});

app.get('/campgrounds/new',(req, res) => {
  res.render('new.ejs')
});

app.post('/campgrounds', (req, res) => {
  console.log(req.body.image);
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  Campground.create(newCampground, function(err, newCampground) {
    if(err){
      console.log("error");
    } else {
      console.log(newCampground);
      res.redirect('/campgrounds');
    }
  });
})

app.listen(8080, () => {
  console.log("server is listening on PORT 8080")
})
