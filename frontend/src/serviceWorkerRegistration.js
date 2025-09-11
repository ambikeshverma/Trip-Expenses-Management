export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      console.log('Service worker registered', reg);
      return reg;
    } catch (err) {
      console.warn('SW register failed', err);
    }
  }
}
