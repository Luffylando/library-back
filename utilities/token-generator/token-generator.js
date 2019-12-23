const crypto = require('crypto');
const base64url = require('base64url');

const generateToken = () => base64url(crypto.randomBytes(60));

module.exports = generateToken;
