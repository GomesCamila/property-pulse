import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

// Get /api/bookmarks

export async function GET() {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response("User ID is required", { status: 401 });
        }

        const { userId } = sessionUser;

        const user = await User.findById(userId);

        // Get the user's bookmarked properties
        const bookmarks = await Property.find({
            _id: { $in: user.bookmarks },
        });

        return new Response(JSON.stringify(bookmarks), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("An error occurred", { status: 500 });
    }
}

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

        console.log(user);

        // Check if the user has already bookmarked the property
        let isBookmarked = user.bookmarks.includes(propertyId);

        let message;

        if (isBookmarked) {
            user.bookmarks.pull(propertyId);
            message = "Property removed from bookmarks";
            isBookmarked = false;
        } else {
            user.bookmarks.push(propertyId);
            message = "Property added to bookmarks";
            isBookmarked = true;
        }

        await user.save();

        return new Response(
            JSON.stringify({ message, isBookmarked }, { status: 200 })
        );
    } catch (error) {
        console.log(error);
        return new Response("An error occurred", { status: 500 });
    }
}
