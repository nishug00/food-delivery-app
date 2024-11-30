const crypto = require('crypto');

function decrypt(encryptedData) {
    const key = Buffer.from(process.env.SECRET_KEY, 'hex');
    const iv = Buffer.from(process.env.IV_VECTOR, 'hex');

    try {
        // Ensure the encryptedData is in Base64 or Hex format. 
        // If it's base64-encoded, decode it first to buffer.
        const encryptedBuffer = Buffer.from(encryptedData, 'base64'); // Change to 'hex' if encrypted data is hex
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(encryptedBuffer, null, 'utf8'); // No need to specify encoding for input
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        console.error('Decryption Error:', err);
        throw new Error(`Error decrypting card data: ${err.message}`);
    }
}

module.exports = { decrypt };
