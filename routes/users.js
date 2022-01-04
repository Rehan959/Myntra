var mongoose = require("mongoose");
var uri =
  "mongodb+srv://Rehan:Rehan@myntra.mvsya.mongodb.net/Project0?retryWrites=true&w=majority";
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(()=>{
   console.log('Database connected')
  })
  .catch((err) => {
    console.log(err);
  });


  let userSchema=mongoose.Schema({
    googleId:String
  }) 

module.exports= mongoose.model('user',userSchema)