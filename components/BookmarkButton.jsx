"use client";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

function BookmarkButton({ property }) {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(
        function checkBookmarkStatusEffect() {
            if (!userId) {
                setLoading(false);
                return;
            }

            async function checkBookmarkStatus() {
                try {
                    const res = await fetch("/api/bookmarks/check", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ propertyId: property._id }),
                    });

                    if (res.status === 200) {
                        const data = await res.json();
                        setIsBookmarked(data.isBookmarked);
                    }
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
            checkBookmarkStatus();
        },
        [property._id, userId]
    );

    async function handleClick() {
        if (!userId) {
            toast.error("You must be logged in to bookmark a property");
            return;
        }

        try {
            const res = await fetch("/api/bookmarks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ propertyId: property._id }),
            });

            if (res.status === 200) {
                const data = await res.json();
                setIsBookmarked(data.isBookmarked);
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        }
    }

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return isBookmarked ? (
        <button
            onClick={handleClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2" /> Remove Bookmark
        </button>
    ) : (
        <button
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
        >
            <FaBookmark className="mr-2" />
            Bookmark Property
        </button>
    );
}

export default BookmarkButton;
