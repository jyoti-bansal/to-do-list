const Todo=require("../model/Todo");

exports.getTodoById=(req,res,next,todoId)=>{
   Todo.findById(todoId).exec((err,todo)=>{
    if(err||!todo){
        return res.status(400).json({
            error:"404 todo not found"
        });
    }
    req.rodo=todo;
    next();
   })
}