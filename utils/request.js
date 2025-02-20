const apiDomain = process.env.NEXT_PUBLIC_API_URL || null;

//Fetch all properties
async function fetchProperties({ showFeatured = false } = {}) {
    try {
        if (!apiDomain) {
            return [];
        }
        const res = await fetch(
            `${apiDomain}/properties${showFeatured ? "/featured" : ""}`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        if (
            error instanceof Error &&
            "digest" in error &&
            error.digest === "DYNAMIC_SERVER_USAGE"
        ) {
            throw error;
        }

        console.log(error);
        return [];
    }
}

//Fetch a single property
async function fetchProperty(id) {
    try {
        if (!apiDomain) {
            return null;
        }
        const res = await fetch(`${apiDomain}/properties/${id}`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}

export { fetchProperties, fetchProperty };
