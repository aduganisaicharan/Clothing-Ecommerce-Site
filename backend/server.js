import express from 'express'
import cors from 'cors'
import 'dotenv/config'  //eo
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// instance of express package 
// APP CONFIG
const app = express()
const port = process.env.PORT || 4000  // now the backend will start on this port number
connectDB()
connectCloudinary()

// MIDDLEWARES
// to add the middlewares we use this
app.use(express.json())// after passing this whatever request we get that will be passed using json
app.use(cors()) // using this we can access the backend from any IP


// API ENDPOINTS
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("Api working") // generate some response
})

// start the express server
app.listen(port,()=>console.log('server started on port',port));


// Zuqh5dhFKRvCaAzj