app.get('/campgrounds', (req, res) => {
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log("error")
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
    }
  })
});

app.get('/campgrounds/new',(req, res) => {
  res.render('campgrounds/new.ejs')
});

app.get('/campgrounds/:id', (req, res) => {
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
app.post('/campgrounds', (req, res) => {
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
