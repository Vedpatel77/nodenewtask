const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },

});
// var upload = multer();
var upload = multer({ 
    storage: storage,
    limits: { fileSize: 1000000 }, //1 Mb


    // fileFilter: function(req,file,callback){
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
    //         callback(null,true)
    //     } else {
    //         console.log("file only jpg and png support!");
    //         callback(null,false)
    //     }
    // },limits:{
}
)
// var upload = multer({
//     storage:storage,
// }).single('testImage')   

module.exports = {upload};