require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;
require('./db/conn');
const {User,Blog} = require('./db/model');
// const Blog = require('./db/model');
const auth = require('./middleware/auth');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const pathRouter = require('./router/path');

app.use(cors({
    origin:"http://localhost:4200",
    credentials:true
}));
app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pathRouter);




app.listen(port,()=>{
    console.log("connection done");
});