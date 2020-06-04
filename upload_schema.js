var mongoose =require("mongoose");
var Schmea = new mongoose.Schema({
   Name : {
       type : String
   }
   ,Email : {
       type : String,
       unique : true
   },Password : {
       type : String
   },Token : [
      {
        type : String
      }
   ]
})

module.exports = mongoose.model('User', Schmea);