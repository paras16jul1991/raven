const multer = require('multer');

const MIME_TYPE = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
} 

const storage = multer.diskStorage( {

    destination  : (req, file ,cb )=>{
        const isvalid = MIME_TYPE[file.mimetype];
        let error = new Error("invalid mime type");
        if(isvalid){
            error = null;
        }
        cb(error,"backend/images");
    },
    filename : (req, file ,cb ) => { 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, name + '-' +  Date.now()+ '.'+ MIME_TYPE [file.mimetype] );
    }
});

module.exports = multer({ storage : storage}).single('image');