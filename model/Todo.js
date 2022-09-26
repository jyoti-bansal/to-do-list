const mongoose=require("mongoose");

const ToDoSchema=new mongoose.Schema({
    title:String,
    description:String,
    createdBy:String,
    createAt:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('ToDo',ToDoSchema);