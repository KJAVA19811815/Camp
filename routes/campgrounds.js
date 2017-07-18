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

//edit
router.get('/campgrounds/:id/edit', checkCampgroundOwnership, (req,res) => {
    Campground.findById(req.params.id, function(err, foundCampground){
          res.render('campgrounds/edit', {campground: foundCampground});
        })
    })

router.put('/campgrounds/:id', checkCampgroundOwnership, (req,res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

router.delete('/campgrounds/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect('/campgrounds')
    } else {
      res.redirect('/campgrounds')
    }
  })
})

//COMMENTS ROUTES

router.post('/campgrounds', isLoggedIn, (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }

  var newCampground = {name: name, image: image, description: description, author: author}
  console.log(req.user);
  Campground.create(newCampground, function(err, newCampground) {
    if(err){
      console.log("error");
    } else {
      console.log("HHOOOO " + newCampground);
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

function checkCampgroundOwnership(req,res,next) {
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        console.log("error")
      } else {
        console.log("IIIDIDIDID " + foundCampground);
        console.log("22222222 " + req.user._id)
        if(foundCampground.author.id.equals(req.user._id)){
          next();

        } else {
          res.redirect("back")
        }
      }
    })
  } else {
    res.redirect("back");
  }
}

module.exports = router;
