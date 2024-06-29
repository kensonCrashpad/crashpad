import axios from "axios";
import authHeader from "../user/auth-header";

const API_URL = "http://localhost:8080/api/property/";

interface PropertyFormState {
    propertyType: string;
    title: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    capacity: number;
    padMaxLength: number;
    padMaxWidth: number;
    description: string;
    availability: number;
    originalPrice: number;
    discountedPrice: number;
    amenities: string[];
    imageUrls: File[]; // This should be File[]
  }

interface PropertyResponseDTO {
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
    amenities: string[];
    imageUrls: string[];
    userCreationDate: string;
    userModifyDate: string;
  }
  

class PropertyService {

  async savePropertyDetails(userId: number, propertyFormData: PropertyFormState): Promise<void> {
    const formData = new FormData();
    formData.append('property', new Blob([JSON.stringify(propertyFormData)], { type: 'application/json' }));
    formData.append('amenities', new Blob([JSON.stringify(propertyFormData.amenities)], { type: 'application/json' }));
    propertyFormData.imageUrls.forEach((image: File, index: number) => {
      formData.append('propertyImages', image);
    });

    try {
      const response = await axios.post(API_URL + `${userId}/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...authHeader()
        },
      });
      console.log('Property saved successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving property', error);
      throw error;
    }
  }

  async getUserProperties(userId: number): Promise<PropertyResponseDTO[]> {
    const response = await axios.get(API_URL + `${userId}/properties`);
    return response.data.data;
  }
//  async savePropertyDetails(userId: number, propertyFormData: PropertyFormState): Promise<void> {
//     const formData = new FormData();
//     formData.append('property', new Blob([JSON.stringify(propertyFormData)], { type: 'application/json' }));
//     propertyFormData.imageUrls.forEach((image: string, index: number) => {
//       formData.append('propertyImages', image);
//     });

//     try {
//       const response = await axios.post(API_URL + `${userId}/add`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           ...authHeader()
//         },
//       });
//       console.log('Property saved successfully', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error saving property', error);
//       throw error;
//     }
//   }

//   async savePropertyDetails(userId: number, propertyFormData: PropertyFormState): Promise<void> {
//     const formData = new FormData();
//     formData.append('property', new Blob([JSON.stringify(propertyFormData)], { type: 'application/json' }));
//     propertyFormData.imageUrls.forEach((image: File) => {
//       formData.append('propertyImages', image);
//     });

//     try {
//       const response = await axios.post(API_URL + `${userId}/add`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           ...authHeader()
//         },
//       });
//       console.log('Property saved successfully', response.data);
//       return response.data;
//     } catch (error) {
//       console.error('Error saving property', error);
//       throw error;
//     }
//   }


//   async getUserProperties(userId: number) {
//     try {
//       const response = await axios.get(API_URL + `${userId}/properties`, { headers: authHeader() });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching user properties', error);
//       throw error;
//     }
//   }

}

export default new PropertyService();



