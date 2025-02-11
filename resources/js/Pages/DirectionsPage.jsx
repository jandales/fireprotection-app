import React, { useState } from "react";
import DirectionsMap from "@/Components/DirectionsMap";
import { router, useForm } from '@inertiajs/react';

const DirectionsPage = () => {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

  

    return (
        <div>
            <h1>Google Directions in Laravel + React</h1>
            <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin" />
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
            <DirectionsMap origin={origin} destination={destination} />
        </div>
    );
};

export default DirectionsPage;