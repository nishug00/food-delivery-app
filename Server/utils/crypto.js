const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY;
const iv = Buffer.from(process.env.IV_VECTOR, 'hex');  // Ensure this matches your .env setup

function decrypt(encryptedText) {
    try {
        // Validate inputs
        if (!secretKey || !iv || !encryptedText) {
            throw new Error('Missing decryption parameters');
        }

        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    } catch (error) {
        console.error('Error decrypting:', error.message);
        throw new Error('Decryption failed');
    }
}

module.exports = { decrypt };
