import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookingResponseDTO } from "../../interfaces/BookingResponseDTO"; 
const API_URL = "http://localhost:8080/api/bookings"; 

const Trips: React.FC = () => {
    const [bookings, setBookings] = useState<BookingResponseDTO[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                const userId = user.id;
                const role = user.role;
                let response;

                if (role === "TRAVELER") {
                    response = await axios.get<BookingResponseDTO[]>(`${API_URL}/traveler/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    });
                } else if (role === "HOST") {
                    response = await axios.get<BookingResponseDTO[]>(`${API_URL}/host/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${user.accessToken}`
                        }
                    });
                }

                if (response) {
                    setBookings(response.data);
                    console.log(`${role} Bookings:`, response.data);
                }
            } catch (error) {
                console.error("Error fetching bookings", error);
                setError("Failed to load bookings");
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Trips Page</h1>
            {error && <p>{error}</p>}
            {/* Render bookings here */}
        </div>
    );
};

export default Trips;
