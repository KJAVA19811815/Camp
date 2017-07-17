app.get('/', (req, res) => {
  res.render('landing')
})


//AUTH ROUTES
app.get('/register', (req,res) => {
    res.render('register');
})

app.get('/login', (req,res) => {
  res.render('login');
});

app.post('/register', (req,res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register')
    } else {
      passport.authenticate('local')(req,res, function(){
        console.log(user);
        res.redirect("/campgrounds")
      })
    }
  })
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  faliureRedirect: 'login'
}), (req,res) => {

});

app.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/campgrounds');
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
