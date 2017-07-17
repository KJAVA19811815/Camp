app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log("err")
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
})

app.post('/campgrounds/:id/comments', isLoggedIn, (req,res) => {
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
          campground.comments.push(comment);
          campground.save();
          console.log(comment)
          res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  })
})
