import test from 'node:test';
import assert from 'node:assert/strict';
import { googlePayRequest, practiceOffers } from '../src/studio-catalog.js';

test('each practice offer produces an example-gateway request with its own USD amount', () => {
  for (const offer of practiceOffers) {
    const request = googlePayRequest(offer);
    assert.equal(request.transactionInfo.totalPrice, offer.price);
    assert.equal(request.transactionInfo.currencyCode, 'USD');
    assert.equal(request.allowedPaymentMethods[0].tokenizationSpecification.parameters.gateway, 'example');
    assert.equal(request.merchantInfo.merchantId, undefined);
  }
});

test('unknown offers and altered practice amounts cannot enter the wallet request', () => {
  assert.throws(() => googlePayRequest({ id: 'unknown', price: '1.00' }));
  assert.throws(() => googlePayRequest({ ...practiceOffers[0], price: '10000.00' }));
});
