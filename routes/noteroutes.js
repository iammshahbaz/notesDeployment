const express = require("express")
const{NoteModel}= require("../model/notemodel")
const noteRouter = express.Router()
const {auth}= require("../middleware/auth")


noteRouter.post("/",auth,async(req,res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.send({"msg":"New note has been added"})
    } catch (error) {
        res.send({"error":error})
    }
})

noteRouter.get("/",auth,async(req,res)=>{
try {
    const notes = await NoteModel.find({userID:req.body.userID}) 
    res.send({notes})
} catch (error) {
    res.send({"error":error})
}   
})

noteRouter.patch("/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params
try {
    const note = await NoteModel.findOne({_id:noteID})
    if(note.userID===req.body.userID){
    await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
    res.send({"msg":`The note with ID:${noteID} has been updated`})
    }else{
        res.send({"msg":"you are not authorised"})
    }
} catch (error) {
    res.send({"error":error})
}  
})

noteRouter.delete("/:noteID",auth,async(req,res)=>{
    const {noteID} = req.params
    try {
        const note = await NoteModel.findOne({_id:noteID})
        if(note.userID===req.body.userID){
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.send({"msg":`The note with ID:${noteID} has been deleted`})
        }else{
            res.send({"msg":"you are not authorised"})
        }
    } catch (error) {
        res.send({"error":error})
    } 
    
})


module.exports={
noteRouter
}