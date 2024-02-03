const {API} = require("./static.data.pnp.js");

module.exports = {
    //admin
    login : API + "admin/login",

    //blogs for admin
    createBlog : API+ "blog/create",
    getAllBlogForAdmin: API+ "blog/get-all-admin-blog",
    updateBlog : API+ "blog/update/",
    getAdminBlogById: API+ "blog/get-blog-by-id/",
    updateBlogStatus: API+ "blog/update-status/",

    //dashboard
    getBlogCounts : API+ "blog/get-counts",

    //public
    getAllBlog: API+ "public/get-all-public-blog",
    getBlogById: API+ "public/get-blog-by-id/",

    //media upload
    uploadImage: API+ "media/upload-image", //TODO
}