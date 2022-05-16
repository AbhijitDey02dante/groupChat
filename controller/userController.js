const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const Chat = require('../model/chat');

const User=require('../model/user');

exports.addUser =async (req,res,next) => {
    try{
        const salt=await bcrypt.genSalt(10);
        const encryptedPassword=await bcrypt.hash(req.body.password,salt);
    
        const obj = {
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:encryptedPassword
        }
        User.create(obj)
        .then((result)=>{
            res.status(200).json(result);
        })
        .catch((error)=>{
            res.status(404).json(error);
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}


function generateAccessToken(id) {
    return jwt.sign(id, process.env.TOKEN);
}
exports.loginUser =async (req,res,next) => {
    try{
        let user = await User.findAll({where:{email:req.body.email}});
        bcrypt.compare(req.body.password, user[0].password, function (error, resolved) {
            if (error) {
                console.log("error");
                res.status(401).json({ success: false, message: error });
            }
            if (resolved) {
                const obj = {
                    id: `${user[0].id}`
                };
                const token = generateAccessToken(JSON.stringify(obj));
                res.json(token);
            }
            else {
                res.status(401).json({ success: false, message: "User not authorized" });
            }
        });
    }
    catch(error){
        res.status(404).json({ success: false, message: "User not found" });
    }
}

exports.verifiedUser=(req,res,next)=>{
    User.findByPk(req.user.id)
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(404).json(error);
    })
}



exports.sendMessage=(req,res,next)=>{
    const message=req.body.message;
    Chat.create({
        message:message,
        userId:req.user.id
    })
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(404).json(error);
    })
}

exports.allMessages=(req,res,next)=>{
    Chat.findAll({
        include:User
    })
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((error)=>{
        res.status(404).json(error);
    })
}