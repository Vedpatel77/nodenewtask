const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const controller = require('../controller/path');




router.get("/logout",auth,controller.logout);
router.get('/users/:id',controller.user);
router.post('/users',controller.addUser);
router.post('/addblog',controller.addBlog);
router.post('/login',controller.login);
router.get('/tabledata',controller.tabledata);
router.get('/blogdata',controller.Blogs);
router.get('/myblog/:email',controller.myBlogs);
router.patch('/users/:id',controller.updateUser);
router.patch('/blogdata/:id',controller.updateBlog);
router.delete('/users/:id',controller.deleteUser);
router.delete('/blogdata/:id',controller.deleteBlog);


module.exports = router;