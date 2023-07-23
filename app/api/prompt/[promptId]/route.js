import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (req,{params}) => {
const { promptId } = params;
    try {
        await connectDB();
        const prompt = await Prompt.findById(promptId).populate("creator");
        return new Response(JSON.stringify(prompt), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
          status: 500
        })
    }
}
export const DELETE = async (req,{params}) => {
   const { promptId } = params;
    try {
        await connectDB();
        await Prompt.findByIdAndDelete(promptId);
         return new Response( "Prompt deleted successfully", {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
          status: 500
        })
    }
}

export const PUT = async (req,{params}) => {
    const { promptId } = params;
    const { prompt, tag } = await req.json();
    try {
        await connectDB();
        const updatedPrompt = await Prompt.findByIdAndUpdate(promptId,{
            prompt,
            tag
        },{new:true});
        return new Response(JSON.stringify(updatedPrompt), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
          status: 500
        })
    }
}
