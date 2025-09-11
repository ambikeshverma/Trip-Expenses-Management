/**
 * Run this script after installing dependencies:
 *   node utils/generateVAPID.js
 * It will print VAPID keys which you can copy into .env
 */
const webpush = require('web-push');
const keys = webpush.generateVAPIDKeys();
console.log('VAPID_PUBLIC_KEY=' + keys.publicKey);
console.log('VAPID_PRIVATE_KEY=' + keys.privateKey);
