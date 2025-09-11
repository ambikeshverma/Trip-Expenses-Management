const webpush = require('web-push');

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
  console.warn('VAPID keys are not set. Push will fail until you set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY in .env');
} else {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:you@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const sendPush = async (subscription, payload) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (err) {
    // bubble up so caller can delete invalid subscriptions
    throw err;
  }
};

module.exports = { sendPush };
