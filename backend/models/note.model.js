const mongoose= require('mongoose');

const noteSchema= new mongoose.Schema(
    {
        topic:{
            type: String,
            trim: true,
            required: [true, "Please Enter Topic"]
        },
        description:{
            type: String,
            trim: true
        },
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
        
    },
    {
        timestamps: true
    }
)

const Note= mongoose.model('Note', noteSchema);
module.exports= Note;