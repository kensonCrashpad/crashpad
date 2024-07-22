export interface BookingResponseDTO {
    bookingId: number;
    startDate: string; // Using string to match the format 'dd-MM-yyyy'
    endDate: string; // Using string to match the format 'dd-MM-yyyy'
    userCreationDate: string;
    userModifyDate: string;
    statusOfBooking: string;
    totalCost: number;
    specialRequests: string;
    hostId: number;
    travelerId: number;

    // Property details
    propertyId: number;
    propertyType: string;
    title: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    capacity: number;
    padMaxLength: string;
    padMaxWidth: string;
    description: string;
    availability: string;
    originalPrice: string;
    discountedPrice: string;

    // Property images
    imageUrls: string[];
}
