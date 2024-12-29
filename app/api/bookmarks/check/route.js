import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        await connectDB();

        const { propertyId } = await request.json();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 });
        }

        const { userId } = sessionUser;

        const user = await User.findById(userId);

        // Check if the user has already bookmarked the property
        let isBookmarked = user.bookmarks.includes(propertyId);

        return new Response(JSON.stringify({ isBookmarked }, { status: 200 }));
    } catch (error) {
        console.log(error);
        return new Response("An error occurred", { status: 500 });
    }
}
