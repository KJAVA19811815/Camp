const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const campgrounds = [
  {name: 'Mars', image: 'http://channel.nationalgeographic.com/exposure/content/photo/photo/2111358_interactive-mars-base-tour_r7uqh32wnwpeezcsxgnasl6vipggiqn63zkcn5eeuqux54zcfvtq_1200x540.jpg'},
  {name: 'Purgatory', image: 'https://4.bp.blogspot.com/-4ub7ohQyWDs/WSGojyaM9-I/AAAAAAABmH0/7iGfncs7p40-ycRxeyHWvvAOq1udMSVuACLcB/s1600/10562758_10206138511957084_2109364772640951411_o.jpg'},
  {name: 'Hogwarts', image: 'https://images.pottermore.com/bxd3o8b291gf/2phT56DSucuUqU6Icm6mCe/b1fd2811691e41ffd1622a07eb528604/HogwartsCastle_WB_F4_HogwartsThroughTheTrees_Illust_100615_Land.jpg?w=1200'}
]


var app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.render('landing')
})

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new',(req, res) => {
  res.render('new.ejs')
});

app.post('/campgrounds', (req, res) => {
  console.log(req.body.image);
  var name = req.body.name;
  var image = req.body.image;

  var newCamp = {name: name, image: image}
  campgrounds.push(newCamp);

  res.redirect('/campgrounds');

})

app.listen(8080, () => {
  console.log("server is listening on PORT 8080")
})
