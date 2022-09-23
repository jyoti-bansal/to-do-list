const express=require("express");
const mongoose=require("mongoose");

const port=8000;

const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/todoapp",{
    useNewUrlParser:true,
    useUnifiesTopology:true,
    useCreateIndex:true,
})
.then(()=>{
    console.log("Connected!!!");
});

app.listen(port,()=>{
    console.log("Listening....");
})