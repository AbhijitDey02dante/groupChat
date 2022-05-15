const bcrypt=require('bcryptjs');

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