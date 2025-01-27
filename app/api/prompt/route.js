import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const timestamp = new Date().getTime();
        const prompts = await Prompt.find({}).populate('creator').sort({ timestamp: -1 });

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

// get all prompts