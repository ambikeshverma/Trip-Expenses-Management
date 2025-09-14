self.addEventListener('push', function(event) {
  let data = {};
  try { data = event.data.json(); } catch(e) { data = { title: 'Update', body: event.data?.text() }; }
  const title = data.title || 'Notification';
  const options = {
    body: data.body || '',
    data: data.data || {},
    tag: data.data?.tripId || undefined,
    renotify: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: "window" }).then(clientList => {
    if (clientList.length > 0) {
      const client = clientList[0];
      return client.focus();
    }
    return clients.openWindow('/');
  }));
});
