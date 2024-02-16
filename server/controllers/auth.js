import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"
import User from "../model/user.js"

export const register=async (req, res)=>{
    console.log(req.body.firstName);
    try {
    const {firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    viewedProfile,
    occupation

    }=req.body;
    const salt=await bcrypt.genSalt(10);
    const passwordHash=await bcrypt.hash(password,salt);
    const newUser=new User({
        firstName,
        lastName,
        email,
        password:passwordHash,
        picturePath,
        friends,
        viewedProfile:Math.floor(Math.random() * 10000),
        location,
        occupation,
        impression:Math.floor(Math.random() * 10000)
    });
   const savedUser= await newUser.save();
   res.status(200).json(savedUser);
    } catch (error) {
       res.status(500).json({error: error.message})       
    }
     
}
export const login=async (req,res)=>{
console.log(req.body);
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
           return res.status(400).json({msg:"user does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({msg:"Credential error"})
      }
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      delete user.password;
      //console.log({token:token,user:user});
      res.status(201).json({token:token,user:user});
    } catch (error) {
        console.log(error)
    }
}