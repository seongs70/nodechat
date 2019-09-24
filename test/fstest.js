const fs = require('fs');
const util = require('util');


//readFile은 파일을 읽는데 비동기로 읽음
fs.readFile(__dirname +'/test.json', 'utf-8', (err,data)=>{
    if (err) return console.error(err);

    console.log("data>>", data);
});

util.log("-------------");

const msgfile = __dirname + '/message.txt';
fs.writeFileSync(msgfile, 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

//동기식으로 읽음
let data2 = fs.readFileSync(msgfile, 'utf-8');
util.log("data2>>", data2);

util.log("=============");