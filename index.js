const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require ("express");
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.use("views" , path.join(__dirname, "/views"));


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
app.get("/" , (req,res) =>{
  let q = "select count(*) from emp";
  try{
    connection.query(q,(err,result) =>{
    if(err) throw err;
    console.log(result[0]["count(*)"]);     
    res.send(result[0]["count(*)"]); 
});
}catch(err){
    console.log(err);
    res.send("Some Error in database");
}
});

app.listen("8080" , () =>{
  console.log("Server is listening to port 8080");
});

// try{
//     connection.query(q,[data],(err,result) =>{
//     if(err) throw err;
//     console.log(result);      
// });
// }catch(err){
//     console.log(err);
// }
// connection.end();