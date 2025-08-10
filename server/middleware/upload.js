import multer from "multer";
import path from 'path';

// This will work only in local machine work as server
// When deployed in production the uploads/ will not work as same
// the server restart the data of image will lost
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname));
    },
});

export const upload = multer({storage});