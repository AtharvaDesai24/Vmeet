const {Schema, model}=require("mongoose");
const userSchema=new Schema({
   name:{type:String,required:true},
   username:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   token:{type:String},
});

const userModel=new model("User",userSchema);
module.exports=userModel;