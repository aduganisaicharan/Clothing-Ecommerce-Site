import express from 'express'
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser) // create post method -> mount it on /register endpoint and whenever we call we execute the registeruser controller function
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

export default userRouter;

// using this router we will create the endpoints   