const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'ghfjdk',
    database : 'testing1'
});

connection.connect();



connection.query('select * from country_state_city where name=?',['Canada'], function(error, results, fields){
    if(error) throw error;
    console.log('The First User is: ', results);
});

connection.end();