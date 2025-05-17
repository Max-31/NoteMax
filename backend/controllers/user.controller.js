const User= require('../models/user.model');

const signUp= async(req, res)=>{
    try{
        const {email, userName, password}= req.body;
    
        const isUser= await User.findOne({email});
    
        if(isUser){
            return res.status(400).json({message: "Email Already exists!"});
        }
    
        const newUser= new User({email, userName, password});
        await newUser.save()
            .then(
                ()=>{
                    res.status(200).json({message: "Registered Successfully!"});
                }
            )
    }
    catch(err){
        res.status(500).json({message: `Issue in Registration!`});
        console.log(err);
    }
}

const logIn= async(req, res)=>{
    try{
        const {email, password}= req.body;
    
        const isUser= await User.findOne({email: email});
        // const isUser= await User.findOne({email: req.body.email});
    
        if(!isUser){
            return res.status(404).json({message: "Couldn't Find User with That Email"});
        }

        if(password === isUser.password){
            return res.status(200).json({message: "Login Successful!"});
        }

        res.status(401).json({message: "Incorrect Password!"});
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {signUp, logIn};