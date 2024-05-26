import { OpenAI } from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    organization: "org-cR932noEpmkQCoRVp1DL8eN4",
    apiKey: "sk-proj-XptaGCoCX1vVHcEDCLbkT3BlbkFJL2CkV1auyeo2t6t6gYBZ"
});

// app.post("/", async (request, response) => {
//     const { chats } = request.body;

//     try {
//         const result = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 {
//                     role: "system",
//                     content: "You are EbereGPT. You can write emails and letters."
//                 },
//                 // ...chats
//                 ...chats.map(chat => ({
//                     role: chat.role === 'user' ? 'user' : 'assistant', // Ensure to use 'assistant' for bot responses
//                     content: chat.content
//                 }))
//             ]
//         });

//         // Log the entire response for debugging
//         console.log(JSON.stringify(result, null, 2));

//         if (result && result.choices && result.choices.length > 0) {
//             response.json({
//                 output: result.choices[0].message.content
//             });
//         } else {
//             response.status(500).json({
//                 error: "Invalid response structure from OpenAI API"
//             });
//         }
//     } catch (error) {
//         // Log the error for debugging
//         console.error("Error from OpenAI API:", error);

//         response.status(500).json({
//             error: "An error occurred while communicating with OpenAI API"
//         });
//     }
// });
app.post("/", async (request, response) => {
    console.log('22222');
    const { chats } = request.body;
    console.log('chats111111',chats);

    try {
        console.log('33333');
        // Construct messages array with valid roles
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
console.log('msg',messages);
        const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });
        console.log('4444');

        // Log the entire response for debugging
        console.log(JSON.stringify(result, null, 2),'dddddddddd');

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
        // Log the error for debugging
        console.error("Error from OpenAI API:", error);

        response.status(500).json({
            error: "An error occurred while communicating with OpenAI API"
        });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
