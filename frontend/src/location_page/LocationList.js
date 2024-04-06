import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom"; // Import NavLink
import LocationDetails from "./Location-single-view";
import EditLocationForm from "./EditLocationForm";

const LocationList = () => {
  const [locations, setLocations] = useState(null || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [selectedEditLocationId, setSelectedEditLocationId] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

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
        const fetchedLocations = response.data.locations;
        setLocations(fetchedLocations);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching devices:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchDataLocations();
  }, []);

  const handleDelete = async (locationId) => {
    // Perform delete request
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/location/delete/${locationId}`,
        {
          headers: {
            Accept: "application/json",
          },
          timeout: 10000, // Timeout in milliseconds (e.g., 10 seconds)
        }
      );
      console.log("Deleted Response:", response.data);
      const deletedResponse = response.data;
      setDeleteResponse(deletedResponse);
      setLoading(false);
      if (response.status !== 200) {
        alert("Cannot delete location as it is associated with devices.");
        window.location.reload();
      } else {
        alert("Location Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error delete location:", error);
      setError(error);
      setLoading(false);

      alert(error.response.data.message);
      window.location.reload();
    }
  };

  const handleUpdate = async (locationId) => {
    console.log("Update Location ID", locationId);
    setSelectedEditLocationId(locationId);
    setShowEditForm(true);
  };

  const navigateSingleview = async (locationId) => {
    setSelectedLocationId(locationId); // Change to locationId instead of location._id
    setShowLocationDetails(true);
  };

  return (
    <div>
      {showLocationDetails ? (
        <LocationDetails locationId={selectedLocationId} />
      ) : showEditForm ? (
        <EditLocationForm locationId={selectedEditLocationId} />
      ) : (
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginLeft: "100px",
          }}
        >
          <h2 style={{ color: "#000000", fontSize: "50px" }}>Locations</h2>
          <NavLink to="/add-location">
            <Button
              variant="primary"
              style={{
                width: "150px",
                alignSelf: "flex-end",
                borderRadius: "20px",
                padding: "10px",
                fontStyle: "oblique",
                background: "rgb(51, 204, 255)",
                border: "none",
                fontSize: "15px",
              }}
            >
              + Add Location
            </Button>
          </NavLink>
          <ListGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {locations.map((location) => (
              <ListGroup.Item
                key={location.id}
                style={{
                  background: "rgb(194, 239, 239)",
                  borderRadius: "40px",
                  padding: "40px",
                  fontSize: "20px",
                }}
              >
                <h5>{location.name}</h5>
                <p>{location.address}</p>
                <p>{location.phone}</p>
                <Button
                  onClick={() => handleUpdate(location._id)}
                  style={{
                    margin: "20px",
                    borderRadius: "10px",
                    padding: "10px",
                    background: "#FFD700", // Golden color
                    border: "none",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(location._id)}
                  style={{
                    borderRadius: "10px",
                    padding: "7px",
                    background: "#FF6347", // Tomato color
                    border: "none",
                  }}
                >
                  Remove
                </Button>

                <Button
                  onClick={() => navigateSingleview(location._id)}
                  style={{
                    borderRadius: "10px",
                    padding: "7px",
                    background: "rgb(0, 206, 209)", // Turquoise color
                    border: "none",
                    marginLeft: "5px",
                  }}
                >
                  View more
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default LocationList;
