import express from 'express';
import { getAllUsers, getLoggedUser } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/getloggeduser', verifyToken, getLoggedUser);

export default router;