const express= require('express');
const mongoose= require('mongoose');
const cors = require('cors');
require('dotenv').config()

const userAuth= require('./routes/user.routes');
const notes= require('./routes/note.routes');

const app= express();

app.use(express.json());
app.use(cors());

const port= process.env.PORT || 1000;
const mongoURI= process.env.MONGO_URI;

app.use('/user', userAuth);
app.use('/note', notes);

//TEST
app.get('/', (req, res)=>{
    res.send("I'm In");
})

mongoose.connect(mongoURI)
    .then(
        ()=>{
            console.log(`DB is Connected`);
            app.listen(port, ()=>{
                console.log(`Server is Running at ${port}`);
            })
        }
    )
    .catch(
        (err)=>{
            console.log(`Issue in DB Connection!`);
            console.log(`${err}`);
        }
    )
