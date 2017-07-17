const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');


router.get('/campgrounds', (req, res) => {
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log("error")
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
    }
  })
});

router.get('/campgrounds/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new.ejs')
});

router.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate("comments").exec(function(err, findCamp){
    if(err) {
      console.log("error")
    } else {
      console.log(findCamp);
      res.render("campgrounds/show",{campground: findCamp})
    }
  })
});

//COMMENTS ROUTES

router.post('/campgrounds', isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;

  var newCampground = {name: name, image: image, description: description}
  Campground.create(newCampground, function(err, newCampground) {
    if(err){
      console.log("error");
    } else {
      console.log(newCampground);
      res.redirect('/campgrounds');
    }
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
