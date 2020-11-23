require('dotenv').config();
const{PORT,DB_Host,DB_User,DB_Password,DB_Schema} = process.env;
const port = PORT;

// Express Initialization
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.send("Hello World");
})

app.listen(port,() =>{
    console.log(`listening at ${port}`);
})
