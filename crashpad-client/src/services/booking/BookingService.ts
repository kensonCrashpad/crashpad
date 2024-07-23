import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

class BookingService {
  createBooking(bookingData: any) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.accessToken;

    return axios.post(`${API_URL}/create`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Booking response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error creating booking:", error);
      throw error;
    });
  }

  fetchBookingsForHost(hostId: number) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.accessToken;

    return axios.get(`${API_URL}/host/${hostId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Host bookings response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching host bookings:", error);
      throw error;
    });
  }

  fetchBookingsForTraveler(travelerId: number) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user.accessToken;

    return axios.get(`${API_URL}/traveler/${travelerId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Traveler bookings response:", response.data);
      return response;
    })
    .catch(error => {
      console.error("Error fetching traveler bookings:", error);
      throw error;
    });
  }
}

export default new BookingService();
