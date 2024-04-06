import React, { useEffect, useState } from "react";
import axios from "axios";

function LocationDetails({ locationId }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Location ID In single view", locationId);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/location/${locationId}`,
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 10000, // Timeout in milliseconds (e.g., 10 seconds)
          }
        );
        const fetchedLocation = response.data;
        setLocation(fetchedLocation);
        console.log("Fetched Location", fetchedLocation, location);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching location:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  // Dummy data
  const dummyLocations = [
    {
      id: location?.location._id || "123456",
      name: location?.location.name || "Location",
      address: location?.location.address || "Address",
      phone: location?.location.phone || "Phone",
      devices: location?.devices || [],
    },
  ];

  console.log("dummy Location", dummyLocations);

  return (
    <div style={{ marginLeft: "300px" }}>
      <h1 style={{ fontSize: "50px" }}>{dummyLocations[0].name}</h1>
      <div className="location-list">
        {dummyLocations.map((location) => (
          <div
            key={location.id}
            className="location"
            onClick={() => handleLocationClick(location)}
          >
            <div>Address: {location.address}</div>
            <div>Phone: {location.phone}</div>

            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {location.devices.map((device, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgb(194, 239, 239)",
                    borderRadius: "40px",
                    padding: "40px",
                    fontSize: "20px",
                    width: "300px",
                  }}
                >
                  <h5>Serial Number: {device.serialNo}</h5>
                  <p>Name: {device.name}</p>
                  <p>Type: {device.type}</p>
                  <p>Status: {device.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {selectedLocation && (
        <div className="location-details">
          <h2>{selectedLocation.name}</h2>
          <div>Address: {selectedLocation.address}</div>
          <div>Phone: {selectedLocation.phone}</div>
          {selectedLocation.devices && selectedLocation.devices.length > 0 ? (
            <ul>
              {selectedLocation.devices.map((device, index) => (
                <li key={index}>{device}</li>
              ))}
            </ul>
          ) : (
            <p>No devices found for this location.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default LocationDetails;
