const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/', (req, res) => {
  res.render('landing')
})


//AUTH ROUTES
router.get('/register', (req,res) => {
    res.render('register');
})

router.get('/login', (req,res) => {
  res.render('login');
});

router.post('/register', (req,res) => {
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

router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  faliureRedirect: 'login'
}), (req,res) => {

});

router.get('/logout', (req,res) => {
  req.logout();
  req.flash("success", "logged you out");
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please login first");
  res.redirect('/login')
}

module.exports = router;
