require('dotenv').config();

const config = {
    encryptionKey: Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    ivVector: Buffer.from(process.env.IV_VECTOR, 'hex'),
    corsOrigin: process.env.CORS_ORIGIN.split(','),
    port: process.env.PORT || 5000,
};

module.exports = config;
