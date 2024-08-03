import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => { //param get poppulate if we pass the dynamic variable to url we have an [id as a dynnamic params]
    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creator: params.id //get the post from the specific creator
        }).populate('creator')

        console.log('Fetched Prompts:', prompts);

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 