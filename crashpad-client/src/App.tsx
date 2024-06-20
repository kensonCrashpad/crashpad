import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/registration/signUp";
import Login from "./components/registration/login";
import Dashboard from "./components/Dashboard/Dashboard";
import PropertReservation from "./components/Dashboard/PropertyReservation";
import Hprofile from "./components/HostProfile/hprofile";
import Property1 from "./components/HostProfile/Property1";
import Property2 from "./components/HostProfile/Property2";
import Property3 from "./components/HostProfile/Property3";
import PadMap from "./components/Dashboard/Map";
import Payment from "./components/Payment/Payment";
import TravelerProfile from "./components/Traveller/TravelerProfile";
import EditProfile from "./components/Traveller/EditUserProfile";
import EditAccommodation from "./components/Traveller/EditAccommodation"
import { Favorite, Message, Settings as MuiSettings } from "@mui/icons-material"; // Renamed Settings from MUI
import Trips from "./components/NavBar/Trips";
import Favorites from "./components/NavBar/Favorites";
import Messages from "./components/NavBar/Messages";
import Settings from "./components/NavBar/Settings"; 
import AddProperty from "./components/HostProfile/AddProperty"; 
import './App.css';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Signup />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hostprofile" element={<Hprofile />} />
          <Route path="/property1info" element={<Property1 />} />
          <Route path="/property2info" element={<Property2 />} />
          <Route path="/property3info" element={<Property3 />} />
          <Route path="/map" element={<PadMap />} />
          <Route path="/propertyinfo" element={<Property1 />} />
          <Route path="/propertyreservation" element={<PropertReservation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/travelerprofile" element={<TravelerProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editaccommodation" element={<EditAccommodation/>} />
          <Route path="/createproperty" element={<AddProperty />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
