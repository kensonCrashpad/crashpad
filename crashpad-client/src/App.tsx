import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/registration/signUp";
import Login from "./components/registration/login";
import Dashboard from "./components/Dashboard/Dashboard";
import PropertyReservation from "./components/Dashboard/PropertyReservation";
import HUserProfile from "./components/HostProfile/hprofile";
import Property1 from "./components/HostProfile/Property1";
import Property2 from "./components/HostProfile/Property2";
import Property3 from "./components/HostProfile/Property3";
import PadMap from "./components/Dashboard/Map";
import Payment from "./components/Payment/Payment";
import TravelerProfile from "./components/Traveller/TravelerProfile";
import EditAccommodation from "./components/Traveller/EditAccommodation";
import { Favorite, Message, Settings as MuiSettings } from "@mui/icons-material";
import Trips from "./components/NavBar/Trips";
import Favorites from "./components/NavBar/Favorites";
// import Messages from "./components/NavBar/Messages";
import Settings from "./components/NavBar/Settings";
import AddProperty from "./components/HostProfile/AddProperty";
import EditHostProfile from "./components/HostProfile/EditHostProfile";
import ShowProfile from './components/Traveller/ShowProfile';
import ImageCarousel from './components/HostProfile/ImageCarousel';
import EditProperty  from './components/HostProfile/EditProperty';


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
            <Route path="/hostprofile" element={<HUserProfile />} />
            <Route path="/property1info" element={<Property1 />} />
            <Route path="/property2info" element={<Property2 />} />
            <Route path="/property3info" element={<Property3 />} />
            <Route path="/map" element={<PadMap />} />
            <Route path="/propertyinfo" element={<Property1 />} />
            <Route path="/propertyreservation" element={<PropertyReservation/>} />
            <Route path="/payment" element={<Payment />} /> 
            <Route path="/travelerprofile" element={<TravelerProfile />} />
            <Route path="/editaccommodation" element={<EditAccommodation />} />
            <Route path="/createproperty" element={<AddProperty />} />
            <Route path="/favorites" element={<Favorites />} />
            {/* <Route path="/messages" element={<Messages />} /> */}
            <Route path="/trips" element={<Trips />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/showProfile" element={<ShowProfile />} />
            <Route path="/host/edit" element={<EditHostProfile />} />
            <Route path="/host/profile" element={<HUserProfile />} />
            <Route path="/carousel" element={<ImageCarousel images={[]} />} />
            <Route path="/host/editproperty" element={<EditProperty/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
