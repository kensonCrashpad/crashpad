import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography, Button, Grid } from "@mui/material";
import { BookingResponseDTO } from "../../interfaces/BookingResponseDTO";
import BookingService from "../../services/booking/BookingService";
import SideNav from './SideNav';
import UserSettings from '../Dashboard/UserSettings';


const Trips: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
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
                    response = await BookingService.fetchBookingsForTraveler(userId);
                } else if (role === "HOST") {
                    response = await BookingService.fetchBookingsForHost(userId);
                }

                if (response && response.data) {
                    setBookings(response.data);
                    console.log(`${role} Bookings:`, response.data);
                    console.debug("bookings",bookings)
                }
            } catch (error) {
                console.error("Error fetching bookings", error);
                setError("Failed to load bookings");
            }
        };

        fetchBookings();
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
        setTabIndex(newIndex);
    };

    const filterBookings = (filterType: string) => {
        const today = new Date();
        
        // Map bookings to statuses
        const bookingsWithStatus = bookings.map(booking => {
            const endDate = new Date(booking.endDate);
            const startDate = new Date(booking.startDate);
            let status = "Cancelled"; // Default status

            if (endDate < today) {
                status = "Completed";
            } else if (startDate >= today) {
                status = "Upcoming";
            }

            return { ...booking, status };
        });

        // Filter based on the selected tab
        let filteredBookings = bookingsWithStatus.filter(booking => booking.status === filterType);


        return filteredBookings;
    };

    const renderTrips = (filteredTrips: BookingResponseDTO[], emptyMessage: string) => {
        if (filteredTrips.length === 0) {
            const [firstLine, secondLine] = emptyMessage.split('\n');
            return (
                <Box sx={{ padding: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{firstLine}</Typography>
                    <Typography variant="body2">{secondLine}</Typography>
                </Box>
            );
        }

        return (
            <Grid container spacing={2} mt={2}>
                {filteredTrips.map((booking) => (
                    <Grid item xs={12} key={booking.bookingId}>
                        <Box
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                padding: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: 'white',
                                border: '1px solid #ddd',
                            }}
                        >
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{booking.name}</Typography>
                                    <Typography variant="body2">Booking ID - {booking.bookingId}</Typography>
                                </Grid>
                                <Grid item xs={2} textAlign="right">
                                    <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                                        VIEW BOOKING
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Check In</Typography>
                                    <Typography variant="body2">
                                        {(() => {
                                            const date = new Date(booking.startDate);
                                            return `${date.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })} 10:00 AM`;
                                        })()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Check Out</Typography>
                                    <Typography variant="body2">
                                        {(() => {
                                            const date = new Date(booking.startDate);
                                            return `${date.toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })} 12:00 PM`;
                                        })()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address</Typography>
                                    <Typography variant="body2">
                                        {booking.street + ", " + booking.city + ", " + booking.state + "-" + booking.zip}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Property Type</Typography>
                                    <Typography variant="body2">{booking.propertyType}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Total Cost</Typography>
                                    <Typography variant="body2">{booking.totalCost}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <>
            <SideNav />
            <UserSettings />
            <Box sx={{ padding: 2, marginLeft: '3rem' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mt: 2, ml: 5 }}>
                    <Tab label="Completed" />
                    <Tab label="Upcoming" />
                    <Tab label="Cancelled" />
                </Tabs>
                <Box sx={{ paddingLeft: 6 }}>
                    {tabIndex === 0 && renderTrips(filterBookings("Completed"), "Looks empty, you've no completed bookings.\nYou will see your itinerary here, after completing you stay.")}
                    {tabIndex === 1 && renderTrips(filterBookings("Upcoming"), "Looks empty, you've no upcoming bookings.\nWhen you book a trip, you will see your itinerary here.")}
                    {tabIndex === 2 && renderTrips(filterBookings("Cancelled"), "Great! Looks like you’ve no cancelled bookings.")}
                </Box>
            </Box>
        </>
    );
};

export default Trips;
