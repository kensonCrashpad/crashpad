export interface UserProfile {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    phone: string | null;
    gender: string;
    age: number;
    description: string | null;
    paymentType: string | null;
    addressId: number | null;
    bookingIds: number[] | null;
    reviewIds: number[] | null;
    vehicleIds: number[] | null;
    favoriteIds: number[] | null;
    paymentIds: number[] | null;
    userId: number;
  }
  