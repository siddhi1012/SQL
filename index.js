const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require ("express");
const app = express();
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

let q = "INSERT INTO emp(id,username,email,password) VALUES ?";

let data = [];
for(let i=1; i<=100; i++){
    data.push(createRandomUser());
}

try{
    connection.query(q,[data],(err,result) =>{
    if(err) throw err;
    console.log(result);      
});
}catch(err){
    console.log(err);
}
connection.end();

app.get("/" , (req,res) =>{
  res.send("Welcome to home page");

});

app.listen("8080" , () =>{
  console.log("Server is listening to port 8080");

});