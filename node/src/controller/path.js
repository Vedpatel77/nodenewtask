const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const { User, Blog } = require('../db/model');
const path = require('path');
const upload = require('../middleware/upload');
const fs = require("fs")

// bodyParser.json({})

//logout 
exports.logout = async (req, res) => {
    try {
        // console.log(req.user);

        req.user.tokens = req.user.tokens.filter((currentele) => {
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
     
        const userfind = await User.findById({_id : req.params.id})
        res.status(200).send({...userfind,res:{
            statusCode:200,
            message : "success"
        }});
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
        const token = await addUser.createtoken();

        const saveUser = await addUser.save();
        console.log(saveUser);
        res.cookie('jwt', token);
        res.send({
            saveUser, res: {
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

//add blog
exports.addBlog = async (req, res) => {
    try {
        // console.log(req.body);
        // upload(req, res,)
        // const blog = new Blog({
        //     blogerEmail: req.body.blogerEmail,
        //     blogTitle: req.body.blogTitle,
        //     blogsummary: req.body.blogsummary,
        //     blogDescription: req.body.blogDescription,
        //     imageUrl: req.body.imageUrl,
        //     file: {
        //         data: fs.readFileSync(
        //             path.join(__dirname + "/uploads/" + req.file.filename)
        //         ),
        //     }
        // })
        console.log(req.body);

        const addBlog = new Blog({
            ...req.body,
            file: {
              data: fs.readFileSync(
                path.join(__dirname + "/uploads/" + req.file.filename)
              ),
            },
          });
        const saveBlog = await addBlog.save();
        console.log(saveBlog);
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

//login
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log(email + " + " + password);
        const user = await User.findOne({ email: email });
        const token = await user.createtoken();

        const ismatch = await bcrypt.compare(password, user.password);
        res.cookie("jwt", token);


        if (ismatch) {
            res.status(200).send({
                user,
                res: {
                    statusCode: 200,
                    message: "success"
                }
            });
        } else {
            res.status(401).send({
                res: {
                    statusCode: 401,
                    message: "user not found"
                }
            });
        }

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
        let limit = Number(req.query.limit) || 3;

        let skip = (page - 1)*limit;

        const users = await User.find().skip(skip).limit(limit);
        // users = users.skip(skip).limit(limit);
        res.send(users);
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
        console.log(req.params.id);
        const updateblog = await Blog.findByIdAndUpdate(req.params.id, req.body);
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
        const deleteblog = await Blog.findByIdAndDelete(req.params.id);
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