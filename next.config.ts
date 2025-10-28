/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com', 'i.pinimg.com' ,"pin.it"], // you used both Imgur and Pinterest images
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
