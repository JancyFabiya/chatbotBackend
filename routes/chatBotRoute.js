import express from 'express';
import { chatBotMsg } from '../controllers/chatBotController.js'; 

const router = express.Router();

router.post('/', chatBotMsg);

export default router; 
