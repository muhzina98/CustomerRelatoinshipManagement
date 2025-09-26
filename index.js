import express from 'express'
import  dotenv from 'dotenv'
import { connectDatabase } from './config/connectDatabase.js'
import userRouter  from './routes/userRouter.js'
import customerRouter from './routes/customerRoute.js'
import caseRouter from './routes/caseRouter.js'
import { globalErrorHandler } from './middlewares/errorMiddleware.js'



dotenv.config()
connectDatabase()



const app=express()
app.use(express.json())

app.use("/api/users", userRouter);
app.use("/api/customers", customerRouter);
app.use("/api/cases", caseRouter);
//app.use("/api/activities", activityRoutes);



app.use(globalErrorHandler);


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
    //console.log("JWT_SECRET:", process.env.JWT_SECRET);

})
