import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import DeviceList from "./device_page/DeviceList";
import LocationList from "./location_page/LocationList";
import HomePage from "./home_page/Home";
import HelpPage from "./help_page/HelpPage";
import AddLocationForm from "./location_page/AddLocationForm";
import AddDeviceForm from "./device_page/AddDeviceForm";

import LocationSingleView from "./location_page/Location-single-view";
import EditDeviceForm from "./device_page/EditDeviceForm";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div style={{ display: "flex", height: "100%" }}>
        {/* Sidebar */}
        <div
          style={{
            width: "150px",
            height: "550px",
            backgroundImage: "linear-gradient(to bottom, #1f7a7a, #0063cc)",

            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "0",
            marginLeft: "-10px",
            marginTop: "-10px",
            position: "fixed",
          }}
        >
          <NavLink
            to="/home"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "20px 70px",
              fontSize: "20px",
              background: "rgb(0, 134, 179)",
              width: "100px",
              marginLeft: "-50px",
              borderRadius: "20px",
              marginBottom: "-110px",
              marginTop: "150px",
            }}
          >
            Home
          </NavLink>
          <NavLink
            to="/locations"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "20px 70px",
              fontSize: "20px",
              background: "rgb(0, 134, 179)",
              width: "100px",
              marginLeft: "-50px",
              borderRadius: "20px",
              marginBottom: "10px",
              marginTop: "130px",
            }}
          >
            Locations
          </NavLink>
          <NavLink
            to="/devices"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "20px 70px",
              fontSize: "20px",
              background: "rgb(0, 134, 179)",
              width: "100px",
              marginLeft: "-50px",
              borderRadius: "20px",
              marginBottom: "18px",
              marginTop: "10px",
            }}
          >
            Devices
          </NavLink>
          <NavLink
            to="/help"
            style={{
              color: "white",
              textDecoration: "none",
              padding: "20px 70px",
              marginBottom: "180px",
              fontSize: "20px",
              background: "rgb(0, 134, 179)",
              width: "100px",
              marginLeft: "-50px",
              borderRadius: "20px",
            }}
          >
            Help
          </NavLink>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, marginLeft: "150px", overflowY: "auto" }}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/devices" element={<DeviceList />} />
              <Route path="/locations" element={<LocationList />} />
              <Route path="/help" element={<HelpPage />} />
              {/* Add route for AddLocationForm */}
              <Route path="/add-location" element={<AddLocationForm />} />
              <Route path="/add-device" element={<AddDeviceForm />} />

              <Route
                path="/location-single-view"
                element={<LocationSingleView />}
              />

              <Route path="/edit-device" element={<EditDeviceForm />} />
              <Route path="/edit-location" element={<EditDeviceForm />} />
            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
