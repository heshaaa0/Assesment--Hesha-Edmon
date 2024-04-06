import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const ChartComponent = ({ deviceCount, locationCount }) => {
  const data = [
    { name: "Devices", value: deviceCount },
    { name: "Locations", value: locationCount },
  ];

  const COLORS = ["#6f42c1", "#fd7e14"];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {/* Pie chart */}
      <div
        style={{
          height: "100vh",
          width: "80%",
          padding: "20px",
          backgroundColor: "rgba(204, 204, 204,0.7)",
          borderRadius: "20px",
          textAlign: "center",
          marginLeft: "150px",
        }}
      >
        <h2>Devices and Locations</h2>
        <div style={{ display: "flex" }}>
          <h3
            style={{
              padding: "20px",
              borderRadius: "19px",
              background: "rgb(102, 204, 255)",
              width: "180px",
              textAlign: "left",
              alignContent: "flex-start",
              marginRight: "250px",
              marginLeft: "130px",
            }}
          >
            {" "}
            No of Devices: {deviceCount}
          </h3>
          <h3
            style={{
              padding: "20px",
              borderRadius: "19px",
              background: "rgb(102, 204, 255)",
              width: "180px",
              alignContent: "flex-end",
            }}
          >
            No of Locations: {locationCount}
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={150}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              style={{ marginBottom: "-50px", marginTop: "-80px" }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
