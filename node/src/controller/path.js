const bcrypt = require('bcrypt');
const { User, Blog } = require('../db/model');
const { unlink } = require('node:fs');


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
        // let offset = Number(req.query.offset) || 1;

        // console.log(page);
        let limit = Number(req.query.limit) || 3;
        // console.log(limit);

        let skip = (page - 1) * limit;

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

        //     if (req.file !== 'undefined') {
        //         const user = await Blog.findById({_id:req.params.id});
        //         const path = user.imageFile;
        //         const imageName = (path.substr(path.lastIndexOf("/") + 1));
        //     unlink(`upload/${imageName}`, (err) => {
        //         if (err) throw err;
        //         console.log(imageName+' was deleted');   
        //       }); 
        //       const imagePath =  `http://localhost:3000/addblog/${req.file.filename}`
        //         console.log(imagePath);
        //       } 
        //       else {

        //         console.log("nothing to do");
        //       }
        //   if (req.file !== 'undefined') {
        //     const updateblog = await Blog.findByIdAndUpdate(req.params.id,{
        //         ...req.body,
        //         imageFile: imagePath
        //       });
        //   } else {
        //     console.log(req.body);
        //     const updateblog = await Blog.findByIdAndUpdate(req.params.id,req.body);
        //   }

        //     res.status(200).send({
        //         message:"success",
        //         statusCode:200
        //     })
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