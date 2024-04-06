// Import necessary modules
import express from "express"; // Import Express framework
import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions
import bodyParser from "body-parser"; // Import Body-parser for parsing request bodies
import dotenv from "dotenv"; // Import dotenv for loading environment variables
import cors from "cors"; // Import cors middleware
import deviceRouter from "./routes/deviceRoutes.js";
import locationRouter from "./routes/locationRoutes.js";

// Initialize Express app
const app = express();

// Enable CORS for all routes
app.use(cors());
// Enable CORS for specific origin (replace 'http://localhost:3000' with your React app's actual origin)
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

// Define port for the server to listen on
const PORT = process.env.PORT || 5000;

// Define MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully."); // Log successful database connection
    // Start server on specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`); // Log server running message
    });
  })
  .catch((error) => console.log(error)); // Log error if database connection fails

// Define route for device
app.use("/api/device", deviceRouter);
app.use("/api/location", locationRouter);
