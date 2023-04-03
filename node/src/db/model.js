const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    RegisterDate:{
        type:Date,
        default:Date.now()
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
       }]
});
const BlogSchema = new mongoose.Schema({
    blogerEmail:{
        type:String,
        required:true
    },
    blogTitle:{
        type:String,
        required:true
    },
    blogsummary:{
        type:String,
        required:true
    },
    blogDescription:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    }
});

userSchema.methods.createtoken = async function() {
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        // console.log(token,"modal");
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token;
    } catch (error) {
        console.log("the error part"+error);
    }
}

userSchema.pre("save",async function (next){
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password,10);
  }
  next();
})

const User = new mongoose.model("User",userSchema);
const Blog = new mongoose.model("Blog",BlogSchema);

module.exports = {User , Blog};