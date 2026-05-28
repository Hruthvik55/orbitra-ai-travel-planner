import crypto from "crypto";

const generateShareId = () => {
  return crypto.randomBytes(16).toString("hex");
};

export default generateShareId;