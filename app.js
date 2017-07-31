const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const flash = require('connect-flash');

const User = require('./models/user')
const Campground = require('./models/campgrounds')
const Comment = require('./models/comment')
const seedDB = require('./seeds');

const commentRoutes = require('./routes/comments')
const campgroundRoutes = require('./routes/campgrounds')
const authRoutes = require('./routes/index')


// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

var app = express();
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);




app.listen(8080, () => {
  console.log("server is listening on PORT 8080")
})
