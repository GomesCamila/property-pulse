import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// /api/messages
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

        const readMessages = await Message.find({
            recipient: userId,
            read: true,
        })
            .sort({ createdAt: -1 })
            .populate("sender", "username")
            .populate("property", "name");

        const unreadMessages = await Message.find({
            recipient: userId,
            read: false,
        })
            .sort({ createdAt: -1 })
            .populate("sender", "username")
            .populate("property", "name");

        const messages = [...unreadMessages, ...readMessages];

        return new Response(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Your message could not be saved", {
            status: 500,
        });
    }
};

// /api/messages
export const POST = async (req) => {
    try {
        await connectDB();

        const { name, property, email, phone, message, recipient } =
            await req.json();

        const sessionUser = await getSessionUser(req);

        if (!sessionUser || !sessionUser.user) {
            return new Response(
                JSON.stringify({
                    message: "You must be logged in to send a message",
                }),
                { status: 401 }
            );
        }

        const { user } = sessionUser;

        if (user.id === recipient) {
            return new Response(
                JSON.stringify({
                    message: "You can't send a message to yourself",
                }),
                { status: 400 }
            );
        }

        const newMessage = new Message({
            name,
            sender: user.id,
            recipient,
            property,
            email,
            phone,
            body: message,
        });

        await newMessage.save();

        return new Response(JSON.stringify({ message: "Message sent" }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response("Your message could not be saved", { status: 500 });
    }
};
