const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'app',
    password : 'Siddhi@1012'

}) ;
let q = "Show tables";
try{
    connection.query(q,(err,result) =>{
    if(err) throw err;
    console.log(result[0]);   
     console.log(result[1]);      
});
connection.end();

}catch(err){
    console.log(err);
}
let createRandomUser = () => {
  return {
    Id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password() 
  };
};
