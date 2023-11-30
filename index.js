
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require('ejs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')// library which is used to connect mongoDB and Express Server 

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')

//mongoose schema
const User = mongoose.model('User',{
    firstName: String,
    lastName:String,
    phone:Number
})

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.get('/users',async (req,res)=>{
    try{
       const users = await User.find();
       res.json(users)
    }catch(err){
       res.send("Data not found")
    }
})

app.post('/users',async (req,res)=>{
    const {firstName,lastName,phone} = req.body;
    try{
        await User.create({firstName,lastName,phone})
    }
    catch(err){
        console.log('Something went wrong');
    }
})

app.patch('/users/:id', async (req,res)=>{
    const {id} = req.params;
    const {firstName,lastName,phone} = req.body
    try{
        await User.findByIdAndUpdate(id , {firstName,lastName,phone})
        res.send("updated successfully")
    }
    catch(err){
        console.log("patch error")
    }
})

app.delete('/users/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        await User.findByIdAndDelete(id)
        res.send("successfully deleted")
    }
    catch{
        console.log("delete error")
    }
})

app.listen(process.env.PORT,()=>{
    mongoose
   .connect(process.env.MONGODB_URL)// this is a method used to connect mongoDB and server but this is asynchronous process.Inside this connect method we have to provide the url of our database.
       .then(()=>{
        console.log('Connection Successful')
       })
       .catch(()=>{
          console.log("Not Connected");
       })
    // The database should be connected inside this listen method because listen method is also a asynchronous method and it is not good if the port connects before the database so in this way we can take care of both the methods happens simultaneously
})

