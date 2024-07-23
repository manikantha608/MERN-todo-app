const express = require("express");
const router = express()

const {getAllTasks,createTask,getTask,updateTask,deleteTask}=require("../controllers/tasks")

//routes creation is two ways
//way1

// router.get("/",getPeople)
// router.post("/",createPerson)
// router.post("/postman",createPersonPostman)
// router.put("/:id",updatePerson)
// router.delete("/:id",deletePerson)

//way2

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports=router