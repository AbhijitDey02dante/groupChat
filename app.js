const express = require('express');
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

const sequelize=require('./util/database');

const userRouter=require('./router/userRouter');

const User=require('./model/user');
const Chat=require('./model/chat');
const Group=require('./model/group');
const GroupMember=require('./model/groupMember');
const GroupChat=require('./model/groupChat');


const app=express();

app.use(cors());
app.use(express.json());


User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(Group);
Group.belongsTo(User);

Group.hasMany(GroupMember);
GroupMember.belongsTo(Group);
User.hasMany(GroupMember);
GroupMember.belongsTo(User);

User.hasMany(GroupChat);
GroupChat.belongsTo(User);


app.use(userRouter);

sequelize
.sync()
.then(()=>{
    app.listen(3000);
})
.catch((error)=>{
    console.log(error);
})