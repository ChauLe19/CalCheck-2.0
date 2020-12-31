const mongoose = require("mongoose");
var jwt = require('jwt-simple');

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).catch(e => console.error(e));

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteFoods: [{
      foodName: {type: String, required: true},
      foodURL: {type: String, required: true},
      imgSrc: {type: String, required: true},
      date: { type: Date, default: Date.now },
      calories: {type: Number, required: true}
    }]
  });


var Person = mongoose.model("Person", UserSchema)


function registerUser(name, email, password) {
  var pw_encoded = jwt.encode(password, process.env.SECRET_ENCRYPT);
  const user = new Person({ name, email, password: pw_encoded, favoriteFoods: []})
  user.save(function (err) {
    if (err) throw err;
  })
};

async function loginUser(email, password)
{
  const user = await Person.findOne({email: email}).exec();
  var pw_encoded = jwt.encode(password, process.env.SECRET_ENCRYPT);
  
  if(user.password != pw_encoded)
  {
    throw new Error("Invalid authentication");
  }

  return user._id;
}

async function addFoodToCurrentUser(email, foodName, foodURL, imgSrc, calories) {
  console.log(foodURL)
  const user = await Person.findOneAndUpdate({ email }, {
    $push: {
      favoriteFoods:{
        foodName,
        foodURL,
        imgSrc,
        calories
      }
    }
  });
  console.log(user);
}

// async changePersonalInfo(first, last, email){

// }

async function changePassword(email, currPw, resetPw, retypedResetPw){
     
  if(resetPw == retypedResetPw){
    pw_old = jwt.encode(currPw, process.env.SECRET_ENCRYPT);
    pw_updated = jwt.encode(resetPw, process.env.SECRET_ENCRYPT);
    const user = await Person.findOneAndUpdate({email: email, password: pw_old}, {password: pw_updated}, (err)=>{
      if(err) throw err
    });
    console.log(pw_old)
    const test = await Person.findOne({email: email});
    console.log(email);
    console.log(test.password);
  }

  //WHAT IF NO ENTRIES WERE GIVEN???
 
}

module.exports = {
  mongoose,
  registerUser,
  loginUser,
  UserSchema,
  addFoodToCurrentUser,
  changePassword
}