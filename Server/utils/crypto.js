const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY;  // Ensure this is correctly set in .env
const iv = process.env.IV;  // Ensure this is correctly set in .env (should be 16 bytes)

// Decrypt function
function decrypt(encryptedText) {
    try {
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    } catch (error) {
        console.error('Error decrypting:', error);
        throw new Error('Decryption failed');
    }
}

module.exports = { decrypt };

