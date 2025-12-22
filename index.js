const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'app',
    password : 'Siddhi@1012'

}) ;

try{
    connection.query("SHOW TABLES",(err,result) =>{
    if(err) throw err;
    console.log(result);      
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
