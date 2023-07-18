/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DATABASE_URL: 'postgres://postgres:admin@localhost:5432/demo',
    }
}

module.exports = nextConfig
