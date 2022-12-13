
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';



const storage = new GridFsStorage({
    url: 'mongodb+srv://ketansali:Ketan7600@cluster0.jc8ks.mongodb.net/WhatsappClone?retryWrites=true&w=majority',
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 