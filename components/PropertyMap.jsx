"use client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";

function PropertyMap({ property }) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: "100%",
        heigh: "500px",
    });
    const [loading, setLoading] = useState(true);
    const [geocodeError, setGeocodeError] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: "en",
        region: "us",
    });

    useEffect(() => {
        async function fetchCoordinates() {
            try {
                const res = await fromAddress(
                    `${property.location.street} ${property.location.city} ${property.location.location} ${property.location.zipcode}`
                );

                if (res.results.length === 0) {
                    setGeocodeError(true);
                    return;
                }

                const { lat, lng } = res.results[0].geometry.location;

                setLatitude(lat);
                setLongitude(lng);
                setViewport({ ...viewport, latitude: lat, longitude: lng });
            } catch (error) {
                console.log(error);
                setGeocodeError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchCoordinates();
    }, []);

    if (loading) {
        return <Spinner loading={loading} />;
    }

    if (geocodeError) {
        return <div className="text-xl">Unable to load map</div>;
    }

    return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import("mapbox-gl")}
                initialViewState={{
                    latitude: latitude,
                    longitude: longitude,
                    zoom: 15,
                }}
                style={{ width: "100%", height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={latitude}
                    longitude={longitude}
                    anchor="bottom"
                >
                    <Image src={pin} alt="location" width={40} height={40} />
                </Marker>
            </Map>
        )
    );
}

export default PropertyMap;
