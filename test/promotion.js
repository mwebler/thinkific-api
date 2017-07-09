import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import Thinkific from '../src/lib/';

test('Should create and delete a promotion', async (t) => {
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

  const p = await thinkific.promotions.create(promo);
  t.is(p.name, promo.name);
  return thinkific.promotions.delete(p.id);
});

test('Should create and update a promotion', async (t) => {
  const promo = {
    "name": "Super test promotion update",
    "description": "My new test promotion",
    "starts_at": "2015-08-30T08:17:09.530Z",
    "expires_at": "2015-09-30T08:17:09.530Z",
    "discount_type": "percentage",
    "amount": 10,
    "duration": 3
  }
  const thinkific = new Thinkific(sampleOpts);

  let p = await thinkific.promotions.create(promo);

  const newName = "updated name";
  const newPromo = Object.assign({}, promo);
  newPromo.name = newName;

  // CHECK: the PUT method is returning an empty response (code 204)
  // But the name is being updated correctly!
  await thinkific.promotions.put(p.id, newPromo);

  p = await thinkific.promotions.getById(p.id);

  t.is(p.name, newName);
  return thinkific.promotions.delete(p.id);
});

test('Should create a promotion and find it by its name', async (t) => {
  const promo = {
    "name": "Super test promotion find",
    "description": "My new test promotion",
    "starts_at": "2015-08-30T08:17:09.530Z",
    "expires_at": "2015-09-30T08:17:09.530Z",
    "discount_type": "percentage",
    "amount": 10,
    "duration": 3
  }
  const thinkific = new Thinkific(sampleOpts);

  const p = await thinkific.promotions.create(promo);

  const found = await thinkific.promotions.find("name", p.name);

  await thinkific.promotions.delete(p.id);

  t.is(found.id, p.id);
});