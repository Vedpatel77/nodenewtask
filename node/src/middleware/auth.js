const jwt = require('jsonwebtoken');
const {User} = require('../db/model');

const auth = async(req,res,next)=>{
    try {

        const token_header = req.header("Authorization").split(" ")[1];
        console.log(token_header,"header");
        if(isTokenExpired(token_header) === true){
          return res.status(419).send();
        }

        // const token=req.cookies.jwt;
        // console.log(token,"auth");
        const verifyuser=jwt.verify(token_header,process.env.SECRET_KEY);
        console.log(verifyuser,"auth");
        const user=await User.findById({_id:verifyuser._id});
        console.log(user);
        // if (!user) {
        //   console.log("error");
        //   throw new Error();
        // }
        req.token=token_header;
        req.user=user;
        console.log("success");
        next()
    } catch (error) {
        res.status(401).send(error);
    }
}

function isTokenExpired(token_header) {
    try {
      const decodedToken = jwt.verify(token_header,process.env.SECRET_KEY);
      const expiritionTime = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      return expiritionTime < currentTime;
    } catch (error) {
      return true
    }
  }


module.exports=auth;