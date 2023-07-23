import { connectDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req,{params}) => {
    try {
        await connectDB();
        const user = await User.findById(params.id);
        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {
            status: 500
        })
    }
}
