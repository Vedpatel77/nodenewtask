const bcrypt = require('bcrypt');
const { User, Blog } = require('../db/model');
const { unlink } = require('node:fs');
const jwt = require('jsonwebtoken');


//logout 
exports.logout = async (req, res) => {
    try {
        // console.log(req.user.tokens,"logout tokens");

        req.user.tokens = req.user.tokens.filter((currentele) => {
            // console.log(currentele,"logout");
            return currentele.token !== req.token;
        })
        res.clearCookie("jwt");
        console.log("logout successfuly");
        await req.user.save();
        res.status(200).send({
            statusCode: 200,
            message: "success"
        })

    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//view user
exports.user = async (req, res) => {
    try {
        const userfind = await User.findById({ _id: req.params.id })
        res.status(200).send({
            ...userfind, res: {
                statusCode: 200,
                message: "success"
            }
        });
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//add user
exports.addUser = async (req, res) => {
    try {
        const addUser = new User(req.body);
        const {token,refresh_token} = await addUser.createtoken();
        console.log(refresh_token);

        const saveUser = await addUser.save();
        console.log(saveUser);
        res.cookie('jwt', token);
        res.send({
            saveUser, res: {
                statusCode: 200,
                message: "success",
                jwt:{
                    access_token:token,
                    refresh_token:refresh_token
                }
            }
        });

    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//add blog
exports.addBlog = async (req, res) => {
    try {
        console.log(req.body);
        const imagePath = `http://localhost:3000/addblog/${req.file.filename}`
        const addBlog = new Blog({
            ...req.body,
            imageFile: imagePath
        });
        console.log(addBlog);
        // const addBlog = new Blog(req.body);
        // console.log(imagePath)
        const saveBlog = await addBlog.save();

        res.send({
            data: saveBlog,
            statusCode: 200,
            message: "success"
        });

    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//login
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                error:true,
                message:"invalid email"
            })
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(401).json({
                error:true,
                message:"invalid password"
            })
        }
        const {token,refresh_token} = await user.createtoken();

        // console.log(refresh_token,"this is refersh");
        res.cookie("jwt", token);



        res.status(200).send({
                    user,
                    res: {
                        statusCode: 200,
                        message: "success"
                    },
                    jwt:{
                        access_token:token,
                        refresh_token:refresh_token
                    }
                });

    } catch (error) {
        res.status(400).send({
            res: {
                statusCode: 400,
                message: "Bad Request"
            }
        });
    }
}

//tabledta(userdata)
exports.tabledata = async (req, res) => {
    try {

        let page = Number(req.query.page) || 1;
        console.log(page);
        // let offset = Number(req.query.offset) || 1;

        // console.log(page);
        let limit = Number(req.query.limit) || 3;
        console.log(limit);

        let skip = (page - 1) * limit;
         console.log(skip);
        const users = await User.find().skip(skip).limit(limit);
        const length = await User.find().count()
        console.log(length);
        // users = users.skip(skip).limit(limit);
        res.status(200).send({
            status:200,
            message:"sucess",
            length:length,
            user:users
        });
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad request"
        });
    }
}

//blogdata
exports.Blogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).send({
            blogs,
            res: {
                statusCode: 200,
                message: "success"
            }
        });
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad request"
        });
    }
}
//myblog
exports.myBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ blogerEmail: req.params.email });
        res.status(200).send({
            blogs,
            res: {
                statusCode: 200,
                message: "success"
            }
        });
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad request"
        });
    }
}

//updateuser
exports.updateUser = async (req, res) => {
    try {

        const updateuser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({
            message: "success",
            statusCode: 200
        })
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//updateblog
exports.updateBlog = async (req, res) => {
    try {

        if (req.file?.filename) {
            const user = await Blog.findById({ _id: req.params.id });
            const path = user.imageFile;
            const imageName = (path.substr(path.lastIndexOf("/") + 1));
            unlink(`upload/${imageName}`, (err) => {
                if (err) throw err;
                console.log(imageName + ' was deleted');
            });

            const imagePath = `http://localhost:3000/addblog/${req.file.filename}`


            const updateblog = await Blog.findByIdAndUpdate(req.params.id, {
                ...req.body,
                imageFile: imagePath
            });
        } else {
            console.log(req.body);
            const updateblog = await Blog.findByIdAndUpdate(req.params.id, req.body);

        }

        res.status(200).send({
            message: "success",
            statusCode: 200
        })

     
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//deleteUser
exports.deleteUser = async (req, res) => {
    try {
        const deleteuser = await User.findByIdAndDelete(req.params.id);
        res.status(200).send({
            statusCode: 200,
            message: "success"
        })
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//deleteblog
exports.deleteBlog = async (req, res) => {
    try {
        // console.log(req.params.id);
        // const user = await Blog.findById({_id:req.params.id})
        // console.log(path);
        const deleteblog = await Blog.findByIdAndDelete(req.params.id);
        const path = deleteblog.imageFile;
        const imageName = (path.substr(path.lastIndexOf("/") + 1));
        unlink(`upload/${imageName}`, (err) => {
            if (err) throw err;
            console.log(imageName + ' was deleted');
        });
        //   fs.remove(`upload/${imageName}`);
        res.status(200).send({
            statusCode: 200,
            message: "success"
        });
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: "Bad Request"
        });
    }
}

//refersh token
exports.refreshToken = async(req,res) => {
    try {
        
        const refreshToken = req.body.Token
        console.log(req.body);
        const refersh_token_verfiy = jwt.verify(refreshToken,process.env.REFERSH_TOKEN_SECRET_KEY);
        console.log(refersh_token_verfiy._id);
        const user = await User.findById(refersh_token_verfiy._id)
        console.log(user)

        const token = jwt.sign({_id:user._id.toString()},process.env.SECRET_KEY,{
            expiresIn:"30s"
        });
        
        res.status(200).send({token})
      } catch (error) {
        console.log(error);
        res.status(500).json({
            statusCode:500,
            message: "Bad Request"
        });
      }
}