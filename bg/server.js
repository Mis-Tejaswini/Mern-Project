const express=require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv= require("dotenv") ;
const cors=require('cors');
dotenv.config();
app.use(express.json());
const userRouter =require("./router/userRoute");

mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected");
    app.listen(process.env.PORT||8000,(err)=>{
        if(err) console.log(err);

        console.log("server running at ",process.env.PORT);
    });
}).catch((err)=>{
    console.log(err);
});
app.use(cors()); 
app.use(userRouter);

// 
