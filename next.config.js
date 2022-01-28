module.exports = {
  reactStrictMode: true,

  env: {
    //STRAPI_API_URL: 'http://192.168.1.60:1337',
    STRAPI_API_URL: 'https://cc-photos-back.herokuapp.com',
  },
  images: {
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: "default",
    domains: ["res.cloudinary.com"],
  },
}
