import Device from "../model/deviceModel.js";

export const createDevice = async (req, res) => {
  try {
    const { name, serialNo, type, status, location, deviceImage } = req.body;
    const device = await Device.create({
      name,
      serialNo,
      type,
      status,
      location,
      deviceImage,
    });
    res.status(201).json({ device });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: "Internal Server Error. " });
  }
};

export const getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json({ devices });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: "Internal Server Error. " });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, serialNo, type, status, location } = req.body;
    const device = await Device.findByIdAndUpdate(
      id,
      { name, serialNo, type, status, location },
      { new: true }
    );
    res.status(200).json({ device });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: "Internal Server Error. " });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findByIdAndDelete(id);
    res.status(200).json({ device });
  } catch (error) {
    // Handle any errors and send an internal server error response
    res.status(500).json({ error: "Internal Server Error. " });
  }
};

export const getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ message: "Device not found." });
    }
    res.status(200).json({ device });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error. " });
  }
};
