const express = require('express')
const userController=require('../controller/userController')


const router = express.Router()



router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/user/:userId", userController.getUserDetail);
router.put("/user/:userId", userController.updateUserDetail);
router.delete("/user/:userId", userController.deleteUser);



module.exports = router;