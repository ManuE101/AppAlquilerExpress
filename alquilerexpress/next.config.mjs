/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "placehold.co"},
            {hostname: "picsum.photos"},
            {hostname: "cf.bstatic.com"},
            {hostname: "www.casasdeplaya.com.ar"},
            {hostname: "encrypted-tbn0.gstatic.com"},
            {hostname: "mylovelyapart.com"},
            {hostname: "geriatricos.portalgeriatrico.com.ar"},
            {hostname: "diarionucleo.com"},
            {hostname: "cipollettidigital.com.ar"}
        ]
    }
};

export default nextConfig;
