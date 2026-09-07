require("dotenv").config();
const express=require("express");

const {Server} =require("socket.io");
const {createServer}=require("node:http");
const mongoose =require("mongoose");
const cors=require("cors");
const { connectToSocket }=require("./controller/socketManager.js");
const port=process.env.PORT || 3000;
const mongoDBUrl=process.env.Mongo_URL;
const app=express();
const server=createServer(app);
const io= connectToSocket(server);
const router = require("./routes/user_routes.js");


app.use(cors());
app.use(express.json({limit:'40kb'}));
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",router);



server.listen(port,()=>{
    mongoose.connect(mongoDBUrl).then(()=>{
        console.log("DB _connected..");
    }).catch((e)=>{
        console.log(e);
    });
    console.log("listening..."+port);
});