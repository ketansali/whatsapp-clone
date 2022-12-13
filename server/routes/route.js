import {Router} from 'express'
import { getConversation, newConversation } from '../controller/conversation-controller.js';
import { getImage, uploadImage } from '../controller/image-controller.js';
import { getMessage, newMessage } from '../controller/message-controller.js';
import { addUser, getUser } from '../controller/user-controller.js'
import upload from '../utils/upload.js';

const router = Router()

router.post('/add',addUser)
router.get('/users', getUser);
router.post('/conversation/add', newConversation);
router.post('/conversation/get', getConversation);

router.post('/message/add', newMessage);
router.get('/message/get/:id', getMessage);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

export default router