
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require('ejs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')// library which is used to connect mongoDB and Express Server 

dotenv.config()
const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine','ejs')



app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(3000,()=>{
    mongoose
   .connect(process.env.MONGODB_URL)// this is a method used to connect mongoDB and server but this is asynchronous process.Inside this connect method we have to provide the url of our database.
       .then(()=>{
        console.log('Connection Successful')
       })
       .catch(()=>{
          console.log("Not Connected");
       })
    // The database should be connected inside this listen method because listen method is also a asynchronous method and it is not good if the port connects before the database so in this way we can take care of both the methods happens simultaneously
    console.log('Successfully Running on port number 3000');
})

