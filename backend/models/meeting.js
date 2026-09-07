const {Schema, model}=require("mongoose");
const meetingSchema=new Schema({
   user_id:{type:String,required:true},
   meetingCode:{type:String,required:true},
   date:{type:Date,default:Date.now(),required:true}
});

const meetingModel=new model("Meeting",meetingSchema);
module.exports=meetingModel;