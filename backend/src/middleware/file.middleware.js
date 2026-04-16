const multer = require("multer");

console.log("FILE MIDDLEWARE LOADED");


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024
    } // 3MB limit
});



module.exports = upload;