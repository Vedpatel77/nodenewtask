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
            
        },
        refresh_token:{
            type:String
        }
       }]
});
const BlogSchema = new mongoose.Schema({
    blogerEmail:{
        type:String
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
    user_id: {
        type: String,
        ref: "User"
    },
    imageFile:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

userSchema.methods.createtoken = async function() {
    try {
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY,{
            expiresIn:"14m"
        });
        const refresh_token = jwt.sign({_id:this._id.toString()},process.env.REFERSH_TOKEN_SECRET_KEY,{
            expiresIn:"30d"
        });
        // console.log(refresh_token);
        // console.log(token,"modal");
        this.tokens=this.tokens.concat({token:token,refresh_token:refresh_token})
        await this.save()
        // console.log(token,"gt");
        // console.log(refresh_token,"gtz");
    return {token,refresh_token};
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