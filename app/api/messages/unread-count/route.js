import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// /api/messages/unread-count
export const GET = async (req) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser(req);

        if (!sessionUser || !sessionUser.user) {
            return new Response(JSON.stringify("User ID is required"), {
                status: 401,
            });
        }
        const { userId } = sessionUser;

        const count = await Message.countDocuments({
            recipient: userId,
            read: false,
        });

        return new Response(JSON.stringify(count, { status: 200 }));
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {
            status: 500,
        });
    }
};
