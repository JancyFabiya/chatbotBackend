import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config as dotenvConfig } from 'dotenv';
import chatBotRoute from './routes/chatBotRoute.js';

dotenvConfig(); 

const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route for chatbot
app.use('/', chatBotRoute);

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
