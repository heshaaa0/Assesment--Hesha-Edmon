import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "./back.jpg";
import ChartComponent from "./ChartComponent";

const HomePage = () => {
  const [dashboardCount, setDashboardCount] = useState(null || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/location/homepage",
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 10000, // Timeout in milliseconds (e.g., 10 seconds)
          }
        );
        const fetchedDashCount = response.data;
        setDashboardCount(fetchedDashCount);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching counts:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchDashCount();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome to DeviceLocator</h1>
      <ChartComponent
        deviceCount={dashboardCount.deviceCount}
        locationCount={dashboardCount.locationCount}
      />
    </div>
  );
};

export default HomePage;
