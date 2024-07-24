import axios from "axios";
import authHeader from "../user/auth-header";

const API_URL = window.location.origin+"/api/property/";

const Favorite_URL  =  window.location.origin+"/api/favorites/";

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
    latitude?: number;
    longitude?: number;
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
    hostId: number;
    latitude?: number;
    longitude?: number;
  }
  

  interface HostDetailsDTO {
    userId: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    gender: string;
    age: number;
    description: string;
  }
  
  interface PropertyDetailsResponseDTO {
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
    userCreationDate: string; // Alternatively, use Date if you want to handle date objects
    userModifyDate: string; // Alternatively, use Date if you want to handle date objects
    hostDetails: HostDetailsDTO;
    latitude?: number;
    longitude?: number;
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

  async editPropertyDetails(propertyId: number, propertyFormData: PropertyFormState): Promise<void> {
    const formData = new FormData();
    formData.append('property', new Blob([JSON.stringify(propertyFormData)], { type: 'application/json' }));
    formData.append('amenities', new Blob([JSON.stringify(propertyFormData.amenities)], { type: 'application/json' }));
    propertyFormData.imageUrls.forEach((image: File, index: number) => {
      formData.append('propertyImages', image);
    });

    try {
      const response = await axios.post(API_URL + `${propertyId}/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...authHeader()
        },
      });
      console.log('Property edited successfully', response.data);
      return response.data;
    } catch (error) {
      console.error('Error editing property', error);
      throw error;
    }
  }

  async getUserProperties(userId: number): Promise<PropertyResponseDTO[]> {
    const response = await axios.get(API_URL + `${userId}/properties`, {
        headers: authHeader()
      });
    console.log("Get User properties - ", response)
    return response.data.data;
  }

  async fetchProperties(): Promise<PropertyResponseDTO[]> {
    const response = await axios.get(API_URL + `all-properties`, {
        headers: authHeader()
      });
    console.log("fetch all propertiess - ", response)
    return response.data.data;
  }

  async fetchPropertyDetailsAndHostDetails(propertyId: number): Promise<PropertyDetailsResponseDTO> {
    const response = await axios.get(API_URL + `${propertyId}/details`, {
        headers: authHeader()
      });
    console.log("fetchPropertyDetailsAndHostDetails - ", response)
    return response.data;
  }

  async searchProperties(query: string): Promise<PropertyResponseDTO[]> {
    
    try {
      const response = await axios.get(`${API_URL}search`, {
        params: { query },
      });
      console.log("Search Response: ", response);
      return response.data;
    } catch (error) {
      console.error('Error searching properties:', error);
      throw error;
    }
  }

  async addFavorite(userId: number, propertyId: number) : Promise<void> {
    
    try {
      const response = await axios.post(`${Favorite_URL}add`, null, {
        params: {
          userId,
          propertyId,
        },
      });
      console.log("Favorite Response: ", response);
      return response.data;
    } catch (error) {
      console.error('Error Marking property as favorite:', error);
      throw error;
    }
    
  };

  async removeFavorite(userId: number, propertyId: number) : Promise<void> {
    
    try {
      const response = await axios.post(`${Favorite_URL}remove`, null, {
        params: {
          userId,
          propertyId,
        },
      });
      console.log("Favorite Response: ", response);
      return response.data;
    } catch (error) {
      console.error('Error Marking property as favorite:', error);
      throw error;
    }
    
  };

  async getUserFavorites(userId: number): Promise<PropertyResponseDTO[]> {
    const response = await axios.get(Favorite_URL + `user/${userId}`, {
        headers: authHeader()
      });
    console.log("Get User FAVORITE properties - ", response)
    return response.data.data;
  }
  


}

export default new PropertyService();



