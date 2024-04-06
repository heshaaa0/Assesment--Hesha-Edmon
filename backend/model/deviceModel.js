import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serialNo: {
    type: String,
    required: true,
  },
  deviceImage: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  location: {
    type: String,
  },
});

export default mongoose.model("Device", deviceSchema);
