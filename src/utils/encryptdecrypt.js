import CryptoJS from "crypto-js";
const SECRET_KEY = process.env.NEXT_PUBLIC_API_ENCRYPTDECRYPT_KEY;

// ** Encrypt data before sending**
export const encryptData = (data) => {
  // console.log("data----------- :",data)
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    // console.error("Encryption Error:", error);
    return null;
  }
};
// ** Decrypt received data**
export const decryptData = (encryptedData) => {
  // console.log("encryptedData", encryptedData);

  try {
    if (!encryptedData) {
      throw new Error("No encrypted data provided.");
    }
    if (typeof encryptedData === "object") {
      // console.log("Data is already decrypted:", encryptedData);
      return encryptedData; // Return as is
    }
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    // console.log("Decrypt data:", JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    // console.error("Decryption Error:", error);
    return null;
  }
};

