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

router.get('/campgrounds/:id/comments/:comment_id/edit', checkCommentOwnership, (req,res) => {
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back")
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  })
})

router.put('/campgrounds/:id/comments/:comment_id', checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
    if(err){
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id )
    }
  })
})

router.delete('/campgrounds/:id/comments/:comment_id', checkCommentOwnership, (req,res) => {
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect('back')
    } else{
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}

function checkCommentOwnership(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        console.log("error")
      } else {
        console.log("IIIDIDIDID " + foundComment);
        console.log("22222222 " + req.user._id)
        if(foundComment.author.id.equals(req.user._id)){
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
