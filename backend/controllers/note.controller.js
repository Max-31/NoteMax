const Note= require('../models/note.model');
const User= require('../models/user.model');

const createNote= async(req, res)=>{
    try{
        const {topic, description, email}= req.body;

        const isUser= await User.findOne({email});

        if(!isUser){
            return res.status(404).json({message: "User NOT Found! Please Login/ SignUp"});
        }
        
        const newNote= new Note({topic, description, user: isUser._id});
        await newNote.save()
        await User.findByIdAndUpdate(isUser._id, {$push: {list: newNote._id}})
            .then(
                ()=>{
                    res.status(201).json({message: "Note is SAVED!"})
                    // res.status(200).json(newNote)
                }
            )
            .catch(
                (err)=>{
                    console.log(err);
                    res.status(500).json({message: "Unsuccessfull Saving!"})
                }
            );
        
            
    }
    catch(err){
        console.log(err);
    }
}
    
const updateNote= async(req, res)=>{
    try{
        const {topic, description, email}= req.body;
        const {id}= req.params;
        
        const isUser= await User.findOne({email});
        
        if(isUser){
            const updatedNote= await Note.findByIdAndUpdate(id, {topic, description}, {new: true});
            if(updatedNote){
                // res.status(200).json(updatedNote)
                res.status(200).json({message: "Note is UPDATED!"})
            }
            else{
                res.status(500).json({message: "Unsuccessful Update!"})
            }
        }
        else{
            res.status(404).json({message: "User NOT Found! Please Login/ SignUp"})
        }
    
    }
    catch(err){
        console.log(err);
    }
}

const fetchNote= async(req, res)=>{
    try{
        const {email}= req.params;
        const {search}= req.query;

        const isUser= await User.findOne({email});
        
        if(isUser){
            const userID= isUser._id;

            let allNote;

            if(search){
                allNote= await Note.find({
                    user: userID,
                    $or: [
                        { topic: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
                        { tags: { $regex: search, $options: 'i' } }
                    ]
                });
            }
            else{
                allNote= await Note.find({user: userID});
            }

            res.status(200).json(allNote);
            // const allNote= await Note.find({user: userID});
            // if(allNote.length===0){
            //     res.status(500).json({message: "NO Note Found!"})
            // }
            // else{
            //     // res.status(200).json({message: "Successful Fetching"})
            //     res.status(200).json(allNote)
            // }
        }
        else{
            res.status(404).json({message: "User NOT Found! Please Login/ SignUp"})
        }
    
    }
    catch(err){
        console.log(err);
    }
}

const deleteNote= async(req, res)=>{
    try{
        const {email}= req.body;
        const {id}= req.params;

        const isUser= await User.findOneAndUpdate({email}, {$pull: {list: id}});
        
        if(isUser){
            await Note.findByIdAndDelete(id)
                .then(
                    ()=>{
                        res.status(200).json({message: "Deleted Successfully!"});
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                        res.status(500).json({message: "Unsuccessfull Saving!"})
                    }
                );
        }
        else{
            res.status(404).json({message: "User NOT Found! Please Login/ SignUp"})
        }
    
    }
    catch(err){
        console.log(err);
    }
}

module.exports= {createNote, updateNote, fetchNote, deleteNote};