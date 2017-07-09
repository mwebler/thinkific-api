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

const promo = {
  "name": "A new Promotion",
	"description": "My new promotion",
	"starts_at": "2015-08-30T08:17:09.530Z",
	"expires_at": "2015-09-30T08:17:09.530Z",
	"discount_type": "percentage",
	"amount": 10,
	"duration": 3
}

test.beforeEach('create a promotion to be used for coupons',
async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  return thinkific.promotions.create(promo).then(p => {
    promo.id = p.id;
  });
});

test.afterEach('Be sure to remove the existing coupons and promotion (useful when connecting to real API)',
async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  return thinkific.promotions.delete(promo.id);
});

test('Should create a coupon for promotion', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  const c = await thinkific.coupons.create(coupon, promo.id);
  t.is(c.code, coupon.code);
});