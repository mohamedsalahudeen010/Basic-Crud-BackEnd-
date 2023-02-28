import express from "express"

const router=express.Router();

import {client} from "./db.js"

import { objectId } from "./db.js";
import { getStudentsByParams, getStudentsByQuery, postMany, postStudent, updateStudent,deleteStudents } from "./functions.js";


//can get all Students and also can get by query
router.get("",async (req,res)=>{
    const query=req.query
    console.log(query)
    
     
    try {
        const stu=await getStudentsByQuery(query)
        if(stu.length<=0){
            return  res.status(404).send({data:"Not Found"})
        }else {return res.status(200).json({data:stu})}
        
    } catch (error) {
        res.status(500).send({data:"Internal Server Error"})
    }
   

    // let query={};
    // if(req.query.name){
    //     const {name}=req.query;
    //     query={"name":name}
    // }else if(req.query.id){
    //     query={"id":req.query.id}
    // }
    // res.send(stu)
    //also 
})

//by using PARAMS

router.get("/:id",async (req,res)=>{
    const {id}=req.params;
    
try {
    const stu=await getStudentsByParams(id)
    if(stu.length<=0){
        res.status(400).send({data:"Not Found"})
        return 
    }
    res.status(200).json({data:stu})
} catch (error) {
    res.status(500).json({data:"Server Error"})
}

    
})

// add students
router.post("",async(req,res)=>{
    const data=req.body;
    
    try {
        if(!data){
            res.send({data:"Enter Valid Input"})
            return
        }
        const stu=await postStudent(data)
        res.send(stu)
    } catch (error) {
        res.status(500).json({data:"Server Error"})
    }
    

})

// add many students
router.post("/many",async(req,res)=>{
    const data=req.body

try {
    if(data.length<=0){
        
        res.status(400).send({data:"Enter Valid Input"})
        return
    }
    const stu=await postMany(data)
    res.status(201).send({data:"Data Added successfully"}) 
} catch (error) {
    res.status(500).json({data:"Server Error"})
}
  
})

//update students


router.put("/:id",async(req,res)=>{
    const {id}=req.params;
    
    try {
        
        // if(updateData.length<1){
        //     res.status(400).json({data:"Enter Content to Edit"})
        //     return
        // }
        const updateData=req.body;
        console.log(updateData=={})
        const updatedStudent=await updateStudent(id,updateData)
        res.status(200).send({data:"Data Edited Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({data:"Server Error"})
    }
   
    
    
    // editStudent=studentsData.find((stud)=>stud.id===id);
    // editStudent.id= req.body.id;
    // editStudent.name= req.body.name;
    // editStudent.species= req.body.species;
    // editStudent.gender= req.body.gender;
    // editStudent.house=req.body.house;
    // editStudent.birth=req.body.birth;
    // editStudent.wand= req.body.wand;
    // editStudent.image= req.body.image; 
})

//Delete Students
router.delete("/:id",async(req,res)=>{
    try {
        const {id}=req.params;

        const stu=await deleteStudents(id)
    
        res.status(201).send(stu)
    } catch (error) {
        console.log(error)
        res.status(500).send({data:"Server Error"})
    }
   


    // const deteteStudent=studentsData.filter((stud)=>stud.id!==id);
    // studentsData=deteteStudent;
    // res.send(studentsData)
})

export const studentRouter=router;
