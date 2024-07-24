import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserFormState = {
    userName: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    location: string;
    email: string;
    phone: string;
    description: string;
    travelerImage: string;
  };
interface UserProfileContextType {
  userProfile: UserFormState;
  updateUserProfile: (data: Partial<UserFormState>) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserFormState>({
    userName: "",
    firstName: "",
    lastName: "",
    age: 0,
    gender: "",
    location: "",
    email: "",
    phone: "",
    description: "",
    travelerImage: ""
  });

  const updateUserProfile = (data: Partial<UserFormState>) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...data,
    }));
  };

  return (
    <UserProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
