const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const meetingModel = require("../models/meeting");


// ================= LOGIN =================

const login = async (req, res) => {

    console.log("LOGIN API HIT");
    console.log("BODY:", req.body);

    const { username, password } = req.body;


    // Check input
    if (!username || !password) {
        return res.status(400).json({
            message: "Please provide username and password"
        });
    }


    try {

        // Find user
        const userSavedData = await userModel.findOne({
            username: username
        });


        // User doesn't exist
        if (!userSavedData) {
            return res.status(404).json({
                message: "User does not exist. Please register"
            });
        }


        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            userSavedData.password
        );


        // Wrong password
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }


        // Create token
        const token = crypto
            .randomBytes(20)
            .toString("hex");


        userSavedData.token = token;

        await userSavedData.save();

       
        // Successful login
        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};



// ================= REGISTER =================

const register = async (req, res) => {

    const {
        name,
        username,
        password
    } = req.body;


    if (!name || !username || !password) {
        return res.status(400).json({
            message: "Please provide all information"
        });
    }


    try {

        // Check existing user
        const existingUser = await userModel.findOne({
            username: username
        });


        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user
        const newUser = new userModel({
            name: name,
            username: username,
            password: hashedPassword
        });


        await newUser.save();


        return res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const getUserHistory=async(req,res)=>{
    const {token}=req.query;

    try{
         const user=await userModel.findOne({token:token});
         const meeeting=await meetingModel.find({user_id:user.username});
         res.json(meeeting);


    }catch(err){
      return res.status(500).json({
        message:"Something went wrong"
      });
    }
}
 
const addToHistory=async(req,res)=>{
    const {token,meetingCode}=req.body;
    try{
        const user =await userModel.findOne({token:token});

        const newMetting=new meetingModel({
            user_id:user.username,
           meetingCode:meetingCode,
        });
        await newMetting.save();
     res.status(200).json({message:"HISTORY ADDED"});
    }catch(err){
          return res.status(500).json({
        message:`Something went wrong ${err}`
      });
    }
}


module.exports = {
    login,
    register,
    getUserHistory,
    addToHistory
};