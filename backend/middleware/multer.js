import multer from 'multer'
// multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
// create storage configuration
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null, file.originalname)
    }
})

// using this diskstorage we will upload middleware 
const upload = multer({storage})

export default upload // export this upload middleware so that we can use this in our product route 