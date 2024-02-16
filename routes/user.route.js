const express = require("express")
const{UserModel}= require("../model/usermodel")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")

userRouter.post("/register",(req,res)=>{
const{username,email,pass}= req.body
try {
    bcrypt.hash(pass,8,async(err,hash)=>{
        if(hash){
            const user =  new UserModel({username,email,pass:hash})
            await user.save()
            res.send({"msg":"New user has been registered"})
        }else{
            res.send({"error":err})
        }
    })
} catch (error) {
    res.send({"error":error})
}
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass}= req.body
    try {
        const user = await UserModel.findOne({email})
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token = jwt.sign({userId:user._id,author:user.username},"masai")
                res.send({"msg":"login successfull",token})
            }else{
                res.send({"msg":"Wrong Credentials","error":err})
            }
        })
    } catch (error) {
        res.send({"error":error})
    }

})


module.exports={
    userRouter
}