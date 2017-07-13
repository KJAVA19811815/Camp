//connect or create databse
mongoose.connect("mongodb://localhost/cat_app");

//SCHEMA
var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temper: String
});

//SET THE MODEL
var cat = mongoose.model("Cat", catSchema);

//CREATE CAT
var george = new Cat({
  name: "Mrs Norris",
  age: 6,
  temper: "angry"
});

//SAVE THE CAT
george.save(function(err, cat){
  if(err) {
    console.log("there was an error")
  } else {
    console.log(cat)
  }
});

//FIND CAT
Cat.find({}, function(err, cats) {
  if(err) {
    console.log("error")
  } else {
    console.log(cats)
  }
})
