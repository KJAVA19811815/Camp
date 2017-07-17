const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comment')
const seedDB = require('./seeds');

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));

//PASSPORT CONFIG

app.use(require("express-session")({
  secret: "Once again karun wins",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});


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

app.listen(8080, () => {
  console.log("server is listening on PORT 8080")
})
