import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
    const { prompt, userId, tag } =await req.json();
     try {
            await connectDB();
            const newPrompt = await Prompt.create({
                prompt,
                creator:userId,
                tag
            })
            return new Response(JSON.stringify(newPrompt), {
                status: 201
            });

     } catch (error) {
            console.log(error);
            return new Response(JSON.stringify(error), {
              status: 500
            })
     }
 }
