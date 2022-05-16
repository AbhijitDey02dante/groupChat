const express = require('express');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

const sequelize=require('./util/database');

const userRouter=require('./router/userRouter');

const User=require('./model/user');
const Chat=require('./model/chat');


const app=express();

app.use(cors());
app.use(express.json());


User.hasMany(Chat);
Chat.belongsTo(User);



app.use(userRouter);

sequelize
.sync()
.then(()=>{
    app.listen(3000);
})
.catch((error)=>{
    console.log(error);
})