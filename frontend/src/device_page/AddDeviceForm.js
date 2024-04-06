import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDeviceForm = () => {
  // State for form fields
  const [serialNo, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [deviceImage, setDeviceImage] = useState(null);

  const [savedLocations, setSavedLocations] = useState(null || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/location/getAll",
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 10000, // Timeout in milliseconds (e.g., 10 seconds)
          }
        );
        console.log(response.data.locations);
        const fetchedLocations = response.data.locations;
        setSavedLocations(fetchedLocations);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching devices:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchDataLocations();
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new device object
    const newDevice = { name, serialNo, type, status, location, deviceImage };
    console.log("New Device", newDevice);
    // Reset form fields
    setSerialNumber("");
    setType("");
    setStatus("");
    setName("");
    setLocation("");
    setDeviceImage("");
    // Send POST request to create new device
    axios
      .post("http://localhost:8080/api/device/create", newDevice)
      .then((response) => {
        console.log(response.data);
        alert("device registered successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
        window.location.reload();
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgb(194, 239, 239)",
          height: "400px",
          width: "300px",
          marginLeft: "350px",
          marginTop: "60px",
          padding: "50px",
          borderRadius: "100px",
        }}
      >
        <h1 style={{ marginLeft: "40px" }}>Add New Device</h1>
        <h3 style={{ color: "#334d4d" }}>Enter below details</h3>

        <label>
          Device Name :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Serial Number :
          <input
            type="text"
            value={serialNo}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Device Image :
          <input
            type="text"
            value={deviceImage}
            onChange={(e) => setDeviceImage(e.target.value)}
            required
          />
        </label>
        <br />
        <br />

        <label>
          Type :
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option>Select type</option>
            <option value="pos">POS</option>
            <option value="kisok">KISOK</option>
            <option value="signage">SIGNAGE</option>
          </select>
        </label>
        <br />
        <br />

        <label>
          Status :
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option>Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <br />
        <br />

        <label>
          Location :
          <select
            value={status}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option>Select Location</option>
            {savedLocations?.map((location) => (
              <option value={location._id}>{location.name}</option>
            ))}
          </select>
        </label>
        <br />
        <br />

        <button
          type="submit"
          style={{
            borderRadius: "10px",
            padding: "15px",
            fontSize: "15px",
            background: "rgba(255, 51, 51,0.5)",
            marginLeft: "70px",
            border: "none",
          }}
        >
          Add Device
        </button>
      </form>
    </div>
  );
};

export default AddDeviceForm;
