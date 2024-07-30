const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');



router.post("/createuser", [
    body('username','Username length must be below 15 characters.').isLength({max : 15}),
    body('password', 'Password length must be atleast 8 characters.').isLength({min : 8}),
    body('email','Invalid E-Mail Address').isEmail()
],
async(req, res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt); 

    try {
        await User.create({ username : username, password : hashPassword, email : email });
        res.json({ success: true });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.json({ success: false, error: 'Server error' });
    }
});


module.exports = router