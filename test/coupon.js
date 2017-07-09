import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import sinon from 'sinon';

import Thinkific from '../src/lib/';

const coupon = {
  code: "abcdef",
  note: "A note",
  quantity: 1,
}

const promoId = 546878;

test('Should create a coupon for promotion', async (t) => {
  var thinkific = new Thinkific(sampleOpts);

  var create = sinon.stub(thinkific, '_post');

  const c = await thinkific.coupons.create(coupon, promoId);

  t.true(create.calledWithExactly(`coupons?promotion_id=${promoId}`, coupon));
});