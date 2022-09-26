const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require('body-parser');

const toDo=require("./model/Todo");
const { create } = require("./model/Todo");

const port=3000;

const app=express();
// app.get("/",(req,res)=>{
//     res.send("<h1>We are on home!</h1>");
// });

mongoose.connect("mongodb://localhost:27017/todoapps",{
    useNewUrlParser:true,

})
.then(()=>{
    console.log("Connected!!!");
})
.catch((err)=>console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//creating to-do by postman
app.post('/',(req,res)=>{
    const{title,description,createdBy}=req.body;
 
    var toDoAdd=new toDo({
        title:title,
        description:description,
        createdBy: createdBy
    });

    toDoAdd.save((err,todo)=>{
        if(err){
            res.status(500).json({
                err
            });
        }else{
            res.status(201).json({
                message:'To-Do has been created',
                todo
            });
        }
    })
})

//View to_do
app.get('/',(req,res)=>{
    toDo.find({},(err,toDos)=>{
        if(err){
            res.status(500).json({
                err
            });
        }else{
            res.status(200).json({
                message:"All ToDos",
                toDos
            });
        }
    });
});

//get specific todo by id
app.get('/:todo_id',(req,res)=>{
    const {todo_id}=req.params;

    toDo.findById(todo_id,(err,toDo)=>{
        if(err){
            res.status(500).json({
                err
            });
        }else{
            res.status(200).json({
                message:'To-Do',
                toDo
            })
        }
    })
})

//Patch method----->>>updating specific to-do id
app.patch('/:todo_id',(req,res)=>{

    const {todo_id}=req.params;
    const {title,description,createdBy}=req.body;

    toDo.findByIdAndUpdate(todo_id,{
        title:title,
        description:description,
        createdBy:createdBy
    },(err,toDo)=>{
        if(err){
            res.status(500).json({
                err
            })
        }else{
            res.status(200).json({
                message:'To-Do updated',
                toDo
            });
        }
    });
});

//delete specific to-do
app.delete('/:todo_id',(req,res)=>{
    const {todo_id}=req.params;

    toDo.findByIdAndDelete(todo_id,(err,toDo)=>{
        if(err){
            res.status(500).json({
                message:"To-Do has been removed",
                toDo
            });
        }
    });
});

//delete all to-do
app.delete('/',(req,res)=>{
    toDo.remove({},(err,toDo)=>{
        if(err){
            res.status(500).json({
                err
            });
        }else{
            res.status(200).json({
                message:'All Todos has been deleted',
                toDo
            });
        }
    });
});

app.listen(port,()=>{
    console.log("Listening....");
})
