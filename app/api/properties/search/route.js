import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/search
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    try {
        await connectDB();

        const location = searchParams.get("location");
        const propertyType = searchParams.get("propertyType");
        const locationPattern = new RegExp(location, "i");

        let query = {
            $or: [
                { name: locationPattern },
                { description: locationPattern },
                { "location.street": locationPattern },
                { "location.city": locationPattern },
                { "location.state": locationPattern },
                { "location.zipcode": locationPattern },
            ],
        };

        if (propertyType && propertyType !== "All") {
            const typePattern = new RegExp(propertyType, "i");
            query.type = typePattern;
        }

        const properties = await Property.find(query);

        return new Response(JSON.stringify(properties, { status: 200 }));
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify("Internal Server Error", { status: 500 })
        );
    }
}
