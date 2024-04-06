import Location from "../model/locationModel.js";
import Device from "../model/deviceModel.js";

export const createLocation = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const location = await Location.create({
      name,
      address,
      phone,
    });
    res.status(201).json({ location });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: error.message });
  }
};

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json({ locations });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: error.message });
  }
};

export const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;
    const location = await Location.findByIdAndUpdate(
      id,
      { name, address, phone },
      { new: true }
    );
    res.status(200).json({ location });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: error.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if any device is associated with the location ID
    const deviceCount = await Device.countDocuments({ location: id });

    if (deviceCount > 0) {
      // If there are devices associated, send a warning message
      return res.status(400).json({
        message: "Cannot delete location as it is associated with devices.",
      });
    }

    // If no devices are associated, proceed with location deletion
    const location = await Location.findByIdAndDelete(id);

    if (!location) {
      // If location with the given ID is not found, send a 404 response
      return res.status(404).json({ message: "Location not found." });
    }

    // Send a success response
    res.status(200).json({ location });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: error.message });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await Location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "Location not found." });
    }
    const devices = await Device.find({ location: id });

    res.status(200).json({ location, devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDevicesRelatedToLocationID = async (req, res) => {
  try {
    const { id } = req.params;
    const devices = await Device.find({ location: id });
    res.status(200).json({ devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHomePageData = async (req, res) => {
  console.log("Fetching data...");
  try {
    // Count of all locations in the system
    const locationCount = await Location.countDocuments();

    // Count of all devices in the system
    const deviceCount = await Device.countDocuments();

    res.status(200).json({ locationCount, deviceCount });
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
