const express = require('express');
const jwt=require('jsonwebtoken');

const router = express.Router();

const userController = require('../controller/userController');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

router.post('/addUser',userController.addUser);
router.post('/loginUser',userController.loginUser);
router.get('/verify',authenticateToken,userController.verifiedUser);
router.post('/sendMessage',authenticateToken,userController.sendMessage);
router.get('/allMessages',authenticateToken,userController.allMessages);


module.exports=router;