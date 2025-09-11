import React, { useState } from 'react';
import { urlBase64ToUint8Array } from '../utils/pushHelpers';
import api from '../api';
import { toast } from 'react-toastify';
import './Styles/NotificationPer.css'

export default function NotifyPermission({ tripId, token }) {
  const [granted, setGranted] = useState(Notification.permission === 'granted');

  const PUBLIC_VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

  const subscribe = async () => {
    try {
      if (Notification.permission === 'default') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') return toast.info('Notifications permission required');
      }
      setGranted(true);
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription() ||
        await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
        });

      await api.post('http://localhost:3000/api/subscribe', { tripId, subscription: sub }, { headers: { Authorization: 'Bearer ' + token }});
      toast.success('Subscribed for notifications');
    } catch (err) {
      console.error(err);
      toast.error('Subscribe failed');
    }
  };

  const unsubscribe = async () => {
    try {
      const reg = await navigator.serviceWorker.ready;
      const s = await reg.pushManager.getSubscription();
      if (s) await s.unsubscribe();
      await api.delete('http://localhost:3000/api/subscribe/' + tripId, { headers: { Authorization: 'Bearer ' + token }});
      setGranted(false);
      toast.info('Unsubscribed');
    } catch (err) {
      console.error(err);
      toast.error('Unsubscribe failed');
    }
  };

  return (
    <div style={{ margin: '8px 0' }}>
      {granted ? (
        <button className='notiPerbtn' onClick={unsubscribe}>Unsubscribe notifications</button>
      ) : (
        <button className='notiPerbtn' onClick={subscribe}>Enable notifications</button>
      )}
    </div>
  );
}
