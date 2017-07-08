import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import Thinkific from '../src/lib/';

const coupon = {
  code: "abcdef",
  note: "A note",
  quantity: 1,
}

const promo = 37692;

test.beforeEach('Be sure to remove the existing coupon (useful when connecting to real API)',
async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  const coupons = await thinkific.coupons.getList(promo);
  coupons.items.forEach(function(c) {
    if(c.code === coupon.code){
      return thinkific.coupons.delete(c.id);
    }
  }, this);
});

test('Should create a coupon for promotion', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  const c = await thinkific.coupons.create(coupon, promo);
  t.is(c.code, coupon.code);
});