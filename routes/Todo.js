const express=require("express");
const router=express.Router();

const{
    createTodo,
}=require("../contollers/Todo");

//to fetch value from url
router.param("todoId",getTodoById);

module.exports=router;