const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//Template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

//mysql connection
// const con = mysql.createPool({
//     connectionLimit:10,
//     host   : process.env.DB_HOST,
//     user   : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME
// });

// con.getConnection((err,connecection)=>{
//     if(err) throw err
//     console.log("connection sucess");
// })

// //Router
// app.get('/',(req,res)=>{
//     res.render("home");
// });

const routes = require("./server/routes/student");
app.use('',routes);


//Listen port
app.listen(port,()=>{
    console.log("listing port : "+port);
});
