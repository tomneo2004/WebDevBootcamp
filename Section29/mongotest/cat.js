var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
	name:String,
	age:Number,
	temperament:String
});

var dogSchema = new mongoose.Schema({
	name:String,
	age:Number,
	temperament:String
});

var dog = mongoose.model("dog", dogSchema);
var Cat = mongoose.model("Cat", catSchema);

/////////////find///////////////////
Cat.find({name:"k"})
.then((cats)=>{

	console.log(cats);
})
.catch((error)=>{

	console.log(error)
});

/////////////create///////////////////
// var puppy = new dog({
// 	name:"puppy",
// 	age:10,
// 	temperament:"Angry"
// });

// puppy.save().then((d)=>{
// 	console.log("dog saved");
// 	console.log(d);

// }).catch((error)=>{

// 	console.log(error);
// });



// var kitty = new Cat({
// 	name:"kitty",
// 	age:10,
// 	temperament:"Angry"
// });

// kitty.save().then((k)=>{
// 	console.log("Kitty saved");
// 	console.log(k);

// }).catch((error)=>{

// 	console.log(error);
// });

