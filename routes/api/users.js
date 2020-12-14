const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',[   
    check('email','Please include a valid email').isEmail(),
    check('password','Please Enter password with more than 6 characters').isLength({min:6})
], async (req,res)=> {

    //validating user fields
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{message:'User already exists'}]});
        }

        //Adding avatar for user
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({            
            email,
            password,
            avatar
        });

        //Using encryption
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.save();

        //JWT authentication
        const payload ={
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            }
            );

    }
    catch(err){
        console.log(err.message);
        res.send(500).send('Server error');
    }
   
    });
    

module.exports = router;