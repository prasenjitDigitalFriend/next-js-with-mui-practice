const { APP_ID } = require("./static.data.pnp.js");

module.exports = {
    APP_ID: APP_ID,
    TOKEN: () => {
        return localStorage.getItem("token-edepto-blog")
    },
    SESSIONID: () => {
        return localStorage.getItem("sessionData")
    }
}