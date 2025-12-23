const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'app',
    password : 'Siddhi@1012'

}) ;
let q = "INSERT INTO user(id,username,email,password) VALUES ?";

let user = [
     ["id_5","abc_user5","abcdg@gmail.com","abcdg"],
    ["id_6","abc_user6","abcdh@gmail.com","abcdh"],
    ["id_7","abc_user7","abcdi@gmail.com","abcdi"],
    ["id_8","abc_user8","abcdj@gmail.com","abcdj"],
    ["id_9","abc_user9","abcdk@gmail.com","abcdk"],
    ["id_10","abc_user10","abcdl@gmail.com","abcdl"]
];
try{
    connection.query(q,[user],(err,result) =>{
    if(err) throw err;
    console.log(result);      
});
}catch(err){
    console.log(err);
}
connection.end();

let createRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password() 
  };
};
