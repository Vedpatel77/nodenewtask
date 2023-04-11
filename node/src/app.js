require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000 ;
require('./db/conn');
const http = require('http').Server(app);
//attach http server to socket.io
const scoketio = require('socket.io')(http);
const {User,Blog} = require('./db/model');
// const Blog = require('./db/model');
const auth = require('./middleware/auth');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const pathRouter = require('./router/path');
const { Socket } = require('dgram');

app.use('/addblog',express.static(path.join('upload')))
app.use(cors({
    origin:"http://localhost:4200",
    credentials:true,
}));
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create new connection
scoketio.on('connection',(socket)=>{
    console.log("user is connected");
    console.log(socket.id);

    socket.on('disconnect',()=>{
        console.log("user is disconneceted");
    })
    socket.on('message',(msg)=>{
        console.log("client message:"+msg);
    })
    socket.emit('servermessage',"hiiii from server side");
})

app.use(pathRouter);



http.listen(port,()=>{
    console.log("connection done");
});