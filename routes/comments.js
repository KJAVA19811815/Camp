const express = require('express');
const router = express.Router();
const Campground = require('../models/campgrounds');
const Comment = require('../models/comment');


router.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log("err")
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
})

router.post('/campgrounds/:id/comments', isLoggedIn, (req,res) => {
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect('/campgrounds')
    } else {
      console.log(req.body.comment);
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        } else{
          //add user name to comment
          console.log("USERNAME " + req.user.username)
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment)
          res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}

module.exports = router;
