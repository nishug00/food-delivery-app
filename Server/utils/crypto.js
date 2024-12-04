const crypto = require('crypto');
const { encryptionKey, ivVector } = require('../config/env');

const encrypt = (data) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, ivVector);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

const decrypt = (encryptedData) => {
    try {
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, ivVector);
        let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        console.error("Decryption failed:", err.message);
        throw new Error('Decryption failed');
    }
};

module.exports = { encrypt, decrypt };
