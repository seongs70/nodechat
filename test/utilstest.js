const util = require('util');
const utils = require('../utils');

let map = utils.makeMap('name', 'seong');
util.log("map>>>>>", map.get('name'));

return;

let str = "NodeJS";
//암호화
let enc = utils.encrypt(str);
util.log("enc=", enc);
//복호화
let dec = utils.decrypt(enc);
util.log("dec=", dec);

let shaEnc = utils.encryptSha2(str);
util.log("shaEnc=", shaEnc);

return;

let url ="https://naver.com";

utils.ogsinfo(url,(err, ret)=>{
    util.log(err, ret);
});