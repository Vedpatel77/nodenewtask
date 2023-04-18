const mongoose = require('mongoose');
const url = process.env.DB_URL;

mongoose.connect(url,{
    useNewUrlParser: true,
	useUnifiedTopology: true,
    family: 4,
}).then(()=>{
    console.log("conncetion with mongodb successful");
}).catch((err)=>{
   console.log(err);
})