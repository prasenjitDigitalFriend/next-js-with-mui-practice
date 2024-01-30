import { SALT_KEY } from "../api/static.data.pnp";
const CryptoJS = require("crypto-js");

export const getDecryptData = (encryptData) => {
    if(encryptData == null) return null;
    let decrypted = CryptoJS.AES.decrypt(encryptData, SALT_KEY);
    let data = decrypted.toString(CryptoJS.enc.Utf8);
    try {
        encryptData = JSON.parse(data);
    } catch (e) {
        encryptData = data;
    }
    return encryptData;
}