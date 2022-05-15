const express = require('express');
const dotenv=require('dotenv');
const cors=require('cors');

const sequelize=require('./util/database');

const userRouter=require('./router/userRouter');

const User=require('./model/user');

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use(userRouter);

sequelize
.sync()
.then(()=>{
    app.listen(3000);
})
.catch((error)=>{
    console.log(error);
})