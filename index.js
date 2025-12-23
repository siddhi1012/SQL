const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require ("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.json());

app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views" , path.join(__dirname, "/views"));


const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'app',
    password : 'Siddhi@1012'

});

let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password() 
  ];
};

// fetch and show total number of users on our app
// Home Route
app.get("/" , (req,res) =>{
  let q = "select count(*) from emp";
  try{
    connection.query(q,(err,result) =>{
    if(err) throw err;
    let count = result[0]["count(*)"];     
    res.render("home.ejs",{count}) 
});
}catch(err){
    console.log(err);
    res.send("Some Error in database");
}
});

// Show Route
app.get("/user",(req,res) =>{
  let q = "select * from emp";
  try{
    connection.query(q,(err,result) =>{
      if(err) throw err;
      // console.log(result);

      // res.send(result);
      let data = result ; 
      res.render("users.ejs" , {data});
    });
  }catch(err){
    res.send("some error occured");
  }
});

app.get("/user/:id/edit", (req,res) =>{
  let {id} = req.params;
  let q = `select * from emp where id ='${id}'`;
  try{
    connection.query(q,(err,result) =>{
      if(err) throw err;
      let data = result[0];
      res.render("edit.ejs",{data});
    });
  }catch(err){
    res.send("some error occured");
  }
});

// Update Route
app.patch("/user/:id" ,(req,res) =>{
  let {id} = req.params;
  let { password: formPass, username:newUsername} = req.body;
  let q = `select * from emp where id ='${id}'`;
  try{
    connection.query(q, (err,result) =>{
      if(err) throw err;
      let data = result[0];
      if(formPass!= data.password){
        res.send("WRONG password");
      }else{
        let q2 = `update emp set username = '${newUsername}' where id = '${id}'`
        connection.query(q2 , (err,result) =>{
          if(err) throw err;
          res.redirect('/user');
        });
      }
     
    });
  }catch(err){
    res.send("some error occured");
  }
});

app.listen("8080" , () =>{
  console.log("Server is listening to port 8080");
});

