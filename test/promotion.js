import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import sinon from 'sinon';

import Thinkific from '../src/lib/';

test('Should create a promotion', async (t) => {
  const promo = {
    "name": "Super test promotion create and del",
    "description": "My new test promotion",
    "starts_at": "2015-08-30T08:17:09.530Z",
    "expires_at": "2015-09-30T08:17:09.530Z",
    "discount_type": "percentage",
    "amount": 10,
    "duration": 3
  }

  const thinkific = new Thinkific(sampleOpts);

  var create = sinon.stub(thinkific, '_post');

  const p = await thinkific.promotions.create(promo);

  t.true(create.calledWithExactly(`promotions`, promo));
});


test('Should update a promotion', async (t) => {
  const promo = {
    "name": "New name",
    "description": "My new test promotion",
    "starts_at": "2015-08-30T08:17:09.530Z",
    "expires_at": "2015-09-30T08:17:09.530Z",
    "discount_type": "percentage",
    "amount": 10,
    "duration": 3
  }
  const promoId = 545645;
  const thinkific = new Thinkific(sampleOpts);

  var update = sinon.stub(thinkific, '_put');

  // CHECK: the PUT method is returning an empty response (code 204)
  // But the name is being updated correctly!
  await thinkific.promotions.put(promoId, promo);

  t.true(update.calledWithExactly(`promotions/${promoId}`, promo));
});
