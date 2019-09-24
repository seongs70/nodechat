const express = require('express'),
        app = express(),
        util = require('util');

const Pool = require('./pool'),
    Mydb    = require('./mydb');
const testJson = require('./test/test.json');

const pool = new Pool;

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);


app.get('/test/:email', (req, res)=> {
   testJson.email = req.params.email; // cf. req.body, req.query
    testJson.aa = req.query.aa;
    res.json(testJson);
});

app.get('/dbtest/:user', (req, res)=> {
    let user = req.params.user;
    let mydb = new Mydb(pool);
    mydb.execute(conn => {
       conn.query("select * from country_state_city where name=?", [user], (err, ret) => {
           res.json(ret);
       });
    });

});

const server = app.listen(7000, function(){
    console.log("Express's started on port 7000");
});

const io = require('socket.io').listen(server, {
    log: false,
    origins: '*:*',
    pingInterval: 3000,
    pingTimeout: 5000
});

io.sockets.on('connection', (socket, opt)=>{
    socket.emit('message', {msg: 'Welcome ' + socket.id});

    util.log("connection>>>", socket.id, socket.handshake.query);
    //조인
    socket.on('join', function(roomId, fn){
        socket.join(roomId, function(){
            util.log("join", roomId, Object.keys(socket.rooms));
        if(fn)
            fn();
        });
    });
    //나가기
    socket.on('leave', function(roomId, fn){
        socket.leave(roomId, function(){
            if(fn)
                fn();
        });
    });

    socket.on('rooms', function (fn) {
        if(fn)
            fn(Object.keys(socket.rooms));
    });

    //data: {room: 'roomid', msg: 'msg 내용...'}
    socket.on('message', (data, fn)=> {
        util.log("message>>", data.msg, Object.keys(socket.rooms));

        socket.broadcast.to(data.room).emit('message', {room: data.room, msg: data.msg});
        if(fn)
            fn(data.msg);
    });

    socket.on('message-for-one', (socketid, msg, fn) =>{
        socket.broadcast.to(socketid).emit('message', {msg:msg});
    });

    socket.on('disconnecting', function(data){
       util.log("disconnecting>>", socket.id, Object.keys(socket.rooms));
    });

    socket.on('disconnect', function(data){
        util.log("disconnect>>", socket.id, Object.keys(socket.rooms));
    });



});