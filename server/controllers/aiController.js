
// import OpenAI from "openai";
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';


dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateText = async (req, res) => {
    try {
        const { title } = req.body;
        if(!title) {
            return res.status(400).json({success: false, message: "Title is required"});
        }
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Write a professional, engaging blog post about: "${title}" `;

        const result = await model.generateContent(prompt);

        const content = result.response.text();

        res.json({content});
    } catch (error) {
          console.log(error);
        res.status(500).json({ success: false, message: "Failed to generate AI content"});
    }
}
export default generateText;


// const generateText = async (req, res) => {
//     try {

//         const { title } = req.body;
//         if(!title) {
//             return res.status(400).json({success: false, message: "Title is required"});
//         }
//         console.log("Title: ", title);
//         console.log(" API KEY: ", process.env.OPENAI_API_KEY);
//         const prompt = `Write a professional, engaging blog post about: "${title}" with headings, subheadings, and a conclusion.`;
//         console.log("Prompt: ", prompt);
//         const aiResponse = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo',
//             messages: [{role: "user", content: prompt}],
//             max_completion_tokens: 600,
//         });
//         console.log("AI Response: ", aiResponse);
//         const content = aiResponse.choices[0].message.content;
//         console.log("Content: ", content);
//         res.json({content});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: "Failed to generate AI content"});
//     }
// }
