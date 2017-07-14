var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');

var data = [
  {
    name: "Hogwarts",
    image: "https://images.pottermore.com/bxd3o8b291gf/2phT56DSucuUqU6Icm6mCe/b1fd2811691e41ffd1622a07eb528604/HogwartsCastle_WB_F4_HogwartsThroughTheTrees_Illust_100615_Land.jpg?w=1200",
    description: "A magical place where there are ghosts, wizards, goblins etc."
  },
  {
    name: "Mars",
    image: "http://media-channel.nationalgeographic.com/media/uploads/photos/content/video/2016/10/04/778943555810_Mars_BigThinker_Enduring%20the%20Journey.mov.00_02_36_21.Still001.jpg",
    description: "A far away planet in the mikly way galaxy, si=ometimes called the planet red"
  },
  {
    name: "Tatoonie",
    image: "https://vignette4.wikia.nocookie.net/starwars/images/e/e6/MosEisley-celebration.png/revision/latest?cb=20130420052326",
    description: "Home of jabba the hut. Palace of pirates."
  },
  {
    name: "Xandar",
    image: "https://s-media-cache-ak0.pinimg.com/originals/17/f1/3a/17f13a1ea2f5674339240e0a54d787ff.jpg",
    description: "Place of civilisation in the galaxy, saved by peter quill, great place to learn aabout technology"
  }
]

function seedDB(){
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("remove camps");
  });

  data.forEach(function(seed){
    Campground.create(seed, function(err, data){
      if(err){
        console.log("error")
      } else {
        console.log("data added")
      }
    })

  })
}

module.exports = seedDB;
