const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, next) => {
        crypto.randomBytes(16, (error, namewithin) => {
            if(error){
                console.log(ERROR(`crypto cant rename the file | ${error}`));
                return(error);
            }else{
                const filename = file.fieldname+'-'+namewithin.toString('hex') + path.extname(file.originalname);
                next (null, filename);
            }
        });
    }
});
const upload = multer({
    storage: storage
});
module.exports = upload;