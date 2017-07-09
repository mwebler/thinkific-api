import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import Thinkific from '../src/lib/';

const promo = {
  "name": "A new Promotion",
	"description": "My new promotion",
	"starts_at": "2015-08-30T08:17:09.530Z",
	"expires_at": "2015-09-30T08:17:09.530Z",
	"discount_type": "percentage",
	"amount": 10,
	"duration": 3
}

test('Should create a promotion', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  const p = await thinkific.promotions.create(promo);
  t.is(p.name, promo.name);
  return thinkific.promotions.delete(p.id);
});