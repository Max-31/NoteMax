const mongoose= require('mongoose');

const userSchema= new mongoose.Schema(
    {
        email: {
            type: String,
            trim: true,
            required: [true, "Please Enter Email"],
            unique: [true, "Email already Exists"]
        },
        userName:{
            type: String,
            trim: true,
            required: [true, "Please Enter Username"],
            unique: [true, "Username already Exists"]
        },
        password:{
            type: String,
            required: [true, "Please Enter Password"]
        },
        list:[
            {
                type: mongoose.Types.ObjectId,
                ref: "Note"
            }
        ]
    },
    {
        timestamps: true
    }
);

const User= mongoose.model('User', userSchema);
module.exports= User;