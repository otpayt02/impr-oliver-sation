import { useEffect, useRef, useState } from 'react';
import { googlePayRequest, practiceOffers } from './studio-catalog.js';

let googleScript;
function loadGooglePay() {
  if (window.google?.payments?.api) return Promise.resolve();
  if (!googleScript) googleScript = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://pay.google.com/gp/p/js/pay.js';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => { script.remove(); googleScript = null; reject(new Error('Could not load Google Pay')); };
    document.head.append(script);
  });
  return googleScript;
}

export function PracticeCheckout() {
  const [offerId, setOfferId] = useState('first-listen');
  const [status, setStatus] = useState('idle');
  const [wallet, setWallet] = useState(false);
  const [walletStatus, setWalletStatus] = useState('idle');
  const container = useRef(null);
  const offer = practiceOffers.find(item => item.id === offerId);
  const currentOffer = useRef(offer);
  currentOffer.current = offer;

  useEffect(() => {
    if (!wallet) return;
    let disposed = false;
    setWalletStatus('loading');
    loadGooglePay().then(async () => {
      const client = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
      const request = googlePayRequest(currentOffer.current);
      const readiness = await client.isReadyToPay({ apiVersion: 2, apiVersionMinor: 0, allowedPaymentMethods: request.allowedPaymentMethods });
      if (disposed) return;
      if (!readiness.result) { setWalletStatus('unavailable'); return; }
      const button = client.createButton({ buttonColor: 'black', buttonType: 'pay', buttonSizeMode: 'fill', onClick: () => {
        setStatus('wallet-open');
        // Token data never leaves the Google test sheet or enters app storage/logs.
        client.loadPaymentData(googlePayRequest(currentOffer.current)).then(() => {
          if (!disposed) setStatus('wallet-complete');
        }).catch(error => {
          if (!disposed) setStatus(error.statusCode === 'CANCELED' ? 'cancelled' : 'wallet-error');
        });
      } });
      container.current?.replaceChildren(button);
      const artwork = getComputedStyle(button.querySelector('button') || button).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
      if (artwork) await new Promise((resolve, reject) => {
        const asset = new Image();
        const timeout = window.setTimeout(() => reject(new Error('Google Pay artwork timed out')), 12000);
        asset.onload = () => { clearTimeout(timeout); resolve(); };
        asset.onerror = () => { clearTimeout(timeout); reject(new Error('Google Pay artwork unavailable')); };
        asset.src = artwork;
      });
      if (disposed) return;
      setWalletStatus('ready');
    }).catch(() => { if (!disposed) { container.current?.replaceChildren(); setWalletStatus('error'); } });
    return () => { disposed = true; container.current?.replaceChildren(); };
  }, [wallet]);

  const messages = {
    idle: 'Choose an offer, then rehearse a result or open the Google Pay test sheet.',
    success: 'Practice order complete. $0 charged. This is a local simulation; no booking was created.',
    declined: 'Practice decline: the payment was not accepted. Try again or choose a different method.',
    cancelled: 'Payment cancelled. No charge or booking was made. You can try again.',
    'wallet-open': 'Google Pay test sheet opened. Complete or cancel it in the wallet window.',
    'wallet-complete': 'Google Pay TEST response received. No payment was processed and no booking was made.',
    'wallet-error': 'Google Pay could not complete the test. Try a supported browser with a Google account, or use the local rehearsal.',
  };
  return <section className="practice-section" id="checkout" aria-labelledby="checkout-heading">
    <div><p className="studio-eyebrow">Practice checkout · no real charges</p><h2 id="checkout-heading">Try the first<br /><em>little yes.</em></h2><p>Explore the order experience before opening the studio for paid bookings.</p><p className="practice-explainer">Google Pay uses its TEST environment and example gateway. The rehearsal below needs no card or account.</p></div>
    <div className="practice-card">
      <div className="practice-card-top"><span>AP / ORDER REHEARSAL</span><span>TEST</span></div>
      <label>Choose a practice service<select value={offerId} onChange={event => { setOfferId(event.target.value); setStatus('idle'); }}>{practiceOffers.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <div className="practice-total"><h3>{offer.name}</h3><strong>${Number(offer.price).toFixed(0)}<small>USD · example price</small></strong></div><p>{offer.detail}</p>
      <div className="practice-results" aria-label="Local payment simulations"><button className="studio-button" onClick={() => setStatus('success')}>Rehearse success ↗</button><button onClick={() => setStatus('declined')}>Try a decline</button><button onClick={() => setStatus('cancelled')}>Try cancellation</button></div>
      <div className="wallet-area">{!wallet && <button className="wallet-load" onClick={() => setWallet(true)}>Load Google Pay test checkout ↗</button>}<div ref={container} className="google-pay-mount" style={{ display: walletStatus === 'ready' ? 'block' : 'none' }} />{walletStatus === 'ready' && <p className="wallet-caption">Google Pay · TEST wallet · no real charge</p>}{walletStatus === 'loading' && <p role="status">Loading Google Pay…</p>}{['error', 'unavailable'].includes(walletStatus) && <p role="status">Google Pay is unavailable here. Check your connection and use Chrome or Edge with a Google account, or rehearse locally above. <button onClick={() => { setWallet(false); setWalletStatus('idle'); }}>Reset wallet</button></p>}</div>
      <p className={`practice-status status-${status}`} role="status">{messages[status]}</p>
    </div>
  </section>;
}
