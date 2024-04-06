import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import EditDeviceForm from "./EditDeviceForm";

const DeviceList = () => {
  const [devices, setDevices] = useState(null || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [showDeviceEditForm, setShowDeviceEditForm] = useState(false);
  const [selectedEditDeviceId, setSelectedEditDeviceId] = useState(null);

  useEffect(() => {
    const fetchDataDevices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/device/getAll",
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 10000, // Timeout in milliseconds (e.g., 10 seconds)
          }
        );
        const fetchedDevices = response.data.devices;
        setDevices(fetchedDevices);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching devices:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchDataDevices();
  }, []);

  const handleDelete = async (device_id) => {
    console.log("Delete Device ID", device_id);

    // Perform delete request
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/device/delete/${device_id}`,
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
        alert("Cannot delete Device");
        window.location.reload();
      } else {
        alert("Device Deleted SuccesFully");
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

  const handleUpdate = async (device_id) => {
    console.log("Update Device ID", device_id);
    setSelectedEditDeviceId(device_id);
    setShowDeviceEditForm(true);
  };

  return (
    <>
      {showDeviceEditForm ? (
        <EditDeviceForm editDeviceId={selectedEditDeviceId} />
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
          <h2
            className="heading"
            style={{ color: "#000000", fontSize: "50px" }}
          >
            Devices
          </h2>
          <NavLink to="/add-device">
            <Button
              variant="primary"
              style={{
                width: "150px",
                alignSelf: "flex-end",
                borderRadius: "20px",
                padding: "10px",
                fontStyle: "oblique",
                background: "rgb(51, 204, 255)", // Blue color
                border: "none",
                fontSize: "15px",
              }}
            >
              + Add Device
            </Button>
          </NavLink>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {devices.map((device) => (
              <ListGroup.Item
                key={device.serialNumber}
                style={{
                  background: "rgb(194, 239, 239)",
                  borderRadius: "40px",
                  padding: "40px",
                  fontSize: "20px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5>Serial Number: {device.serialNo}</h5>
                  <img
                    src={device.deviceImage}
                    alt={device.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <p>Name: {device.name}</p>
                <p>Type: {device.type}</p>
                <p>Status: {device.status}</p>

                <Button
                  style={{
                    margin: "20px",
                    borderRadius: "10px",
                    padding: "10px",
                    background: "#ffc107", // Yellow color
                    border: "none",
                  }}
                  onClick={() => handleUpdate(device._id)}
                >
                  Edit
                </Button>
                <Button
                  style={{
                    borderRadius: "10px",
                    padding: "7px",
                    background: "#FF6347", // Red color
                    border: "none",
                  }}
                  onClick={() => handleDelete(device._id)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceList;
