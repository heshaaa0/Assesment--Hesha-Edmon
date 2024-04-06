import express from "express";
import {
  createLocation,
  getAllLocations,
  updateLocation,
  deleteLocation,
  getLocationById,
  getDevicesRelatedToLocationID,
  getHomePageData,
} from "../controller/locationController.js";
const route = express.Router();

route.get("/homepage", getHomePageData);
route.post("/create", createLocation);
route.get("/getAll", getAllLocations);
route.put("/update/:id", updateLocation);
route.delete("/delete/:id", deleteLocation);
route.get("/:id", getLocationById);
route.get("/devices/:id", getDevicesRelatedToLocationID);

export default route;
