import { getDecryptData } from "../utils/decryption";
import { SALT_KEY } from "./static.data.pnp";

const axios = require("axios");
const dataApi = require("./data.api");
const CryptoJS = require("crypto-js");

export const postApi = async (postData, url) => {
    try {
        let stringData = JSON.stringify(postData);
        let encrypted = CryptoJS.AES.encrypt(stringData, SALT_KEY);
        let response = await axios({
            method: "post",
            url: url,
            headers: {
                "app-id": dataApi.APP_ID,
                "accept": "application/json",
                "x-access-token": "Bearer " + dataApi.TOKEN(),
                "Content-Type": "application/json",
            },
            data: { data: encrypted.toString() },
        });
        if (response.status === 200) {
            if (response.headers['authorization'] != null && response.headers['authorization'] != "") {
                localStorage.setItem("token-edepto", response.headers['authorization']);
            }
            if (response.data.responseCode === 501) {
                localStorage.setItem("admin-id-blog", "NODATA");
                window.location = "/";
            }
            else {
                if (response.data.data) {
                    response.data.data = getDecryptData(response.data.data);
                }
                return response.data
            };
        } else {
            return {
                status: "error",
                message: "Server Error",
                responsecode: "500",
                data: null,
            };
        }
    } catch (error) {
        return {
            status: "error",
            message: error.message,
            responsecode: "500",
            data: null,
        };
    }
};

export const imageUploadApi = async (postData, url) => {
    try {
        let response = await axios({
            method: "post",
            url: url,
            headers: {
                "app-id": dataApi.APP_ID,
                "accept": "application/json",
                "x-access-token": "Bearer " + dataApi.TOKEN(),
                "Content-Type": "application/json",
            },
            data: postData,
        });
        if (response.status === 200) {
            if (response.headers['authorization'] != null && response.headers['authorization'] != "") {
                localStorage.setItem("token-edepto", response.headers['authorization']);
            }
            if (response.data.responseCode === 501) {
                localStorage.setItem("admin-id-blog", "NODATA");
                window.location = "/";
            }
            else {
                if (response.data.data) {
                    response.data.data = getDecryptData(response.data.data);
                }
                return response.data
            };
        } else {
            return {
                status: "error",
                message: "Server Error",
                responsecode: "500",
                data: null,
            };
        }
    } catch (error) {
        return {
            status: "error",
            message: error.message,
            responsecode: "500",
            data: null,
        };
    }
};

export const getApi = async (url) => {
    try {
        let encrypted = CryptoJS.AES.encrypt(new URL(url).pathname + new URL(url).search, SALT_KEY);
        let response = await axios({
            method: "get",
            url: url,
            headers: {
                "app-id": dataApi.APP_ID,
                "hash": encrypted,
                "accept": "application/json",
                "x-access-token": "Bearer " + dataApi.TOKEN(),
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            if (response.headers['authorization'] != null && response.headers['authorization'] != "") {
                localStorage.setItem("token-edepto", response.headers['authorization']);
            }
            if (response.data.responseCode === 501) {
                localStorage.setItem("admin-id-blog", "NODATA");
                window.location = "/";
            }
            else {
                if (response.data.data) {
                    response.data.data = getDecryptData(response.data.data);
                }
                return response.data
            };
        } else {
            return {
                status: "error",
                message: "Server Error",
                responsecode: "500",
                data: null,
            };
        }
    } catch (error) {
        return {
            status: "error",
            message: error.message,
            responsecode: "500",
            data: null,
        };
    }
};

export const putApi = async (postData, url) => {
    try {
        let stringData = JSON.stringify(postData);
        let encrypted = CryptoJS.AES.encrypt(stringData, SALT_KEY);
        let response = await axios({
            method: "put",
            url: url,
            headers: {
                "app-id": dataApi.APP_ID,
                "accept": "application/json",
                "x-access-token": "Bearer " + dataApi.TOKEN(),
                "Content-Type": "application/json",
            },
            data: { data: encrypted.toString() },
        });
        if (response.status === 200) {
            if (response.headers['authorization'] != null && response.headers['authorization'] != "") {
                localStorage.setItem("token-edepto", response.headers['authorization']);
            }
            if (response.data.responseCode === 501) {
                localStorage.setItem("admin-id-blog", "NODATA");
                window.location = "/";
            }
            else {
                if (response.data.data) {
                    response.data.data = getDecryptData(response.data.data);
                }
                return response.data
            };
        } else {
            return {
                status: "error",
                message: "Server Error",
                responsecode: "500",
                data: null,
            };
        }
    } catch (error) {
        return {
            status: "error",
            message: error.message,
            responsecode: "500",
            data: null,
        };
    }
};