import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config as dotenvConfig } from 'dotenv';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());
dotenvConfig();

const openai = new OpenAI({
    organization: process.env.openai_org,
    apiKey:process.env.openai_apikey
});


app.post("/", async (request, response) => {
    const { chats } = request.body;

    try {
        const messages = [
            {
                role: "system",
                content: "You are EbereGPT. You can write emails and letters."
            },
            ...chats.map(chat => ({
                role: chat.role === 'user' ? 'user' : 'assistant', // Ensure to use 'assistant' for responses
                content: chat.content
            }))
        ];
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        console.log(JSON.stringify(result, null, 2));

        if (result && result.choices && result.choices.length > 0) {
            response.json({
                output: result.choices[0].message.content
            });
        } else {
            response.status(500).json({
                error: "Invalid response structure from OpenAI API"
            });
        }
    } catch (error) {
        console.error("Error from OpenAI API:", error);

        response.status(500).json({
            error: "An error occurred while communicating with OpenAI API"
        });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
