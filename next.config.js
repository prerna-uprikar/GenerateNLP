/** @type {import('next').NextConfig} */
const securityHeaders = require("./headers");
const nextConfig = {
    async headers() {
        return [
          {
            // Apply these headers to all routes in your application.
            source: "/:path*",
            headers: securityHeaders,
          },
        ];
      },
}

module.exports = nextConfig
