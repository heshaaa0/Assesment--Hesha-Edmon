import express from "express";
import {
  createDevice,
  getAllDevices,
  updateDevice,
  deleteDevice,
  getDeviceById,
} from "../controller/deviceController.js";
const route = express.Router();

route.post("/create", createDevice);
route.get("/getAll", getAllDevices);
route.put("/update/:id", updateDevice);
route.delete("/delete/:id", deleteDevice);
route.get("/:id", getDeviceById);

export default route;
