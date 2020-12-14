const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const config = require('config');
const {check, validationResult} = require('express-validator/check');


//Get Current Profile Details
router.get('/me',auth, async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('User',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//Add New Profile
router.post('/',[auth,[
    check('name','Name is required').not().isEmpty(),
    check('dateofbirth','Date of Birth is required').not().isEmpty(),
    check('address','Address is required').not().isEmpty(),

]], async(req,res)=>{    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{
        name,
        address,
        dateofbirth              
    } = req.body;

    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(name) profileFields.name = name;
    if(dateofbirth) profileFields.dateofbirth = dateofbirth;
    if(address) profileFields.address = address;

    try{
        let profile = await Profile.findOne({user:req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set: profileFields},
                {new: true}                
                );
                return res.json(profile);
        }
        

        //Create new 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
        

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//Get profile by ID
router.get('/user/:user_id', async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('User',['name','avatar']);
        if(!profile){
            console.log(profile);
            return res.status(400).json({message:"No profile for this user"});
        }
        res.json(profile);

        
    } catch (error) {
        console.error(error.message);
        if(error.kind=='ObjectId'){
            return res.status(400).json({message:"No profile for this user"});
        
        }
        res.status(500).send('Server Error');
        
    }
});

//Delete Profile
router.delete('/', auth, async (req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({message:"User Removed"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');        
    }
    
})

module.exports = router;