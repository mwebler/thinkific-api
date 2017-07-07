import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import Thinkific from '../src/lib/';

const courseId = 143618;

test('Should loop at product list', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  t.plan(2); //for now there are 2 products

  let products = await thinkific.products.getList();
  do {
    products.items.forEach(p => {
      //do something with product p
      t.pass();
    }, this);

    //get next page
    products = await products.getNext();
  } while (products);
  // done looping at products
});

test('Should get a product by its id', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  let product = await thinkific.products.getById(156665);
  t.is(product.id, 156665);
});

test('Should get assertion for product not found', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  const error = await t.throws(thinkific.products.getById(921232));
  t.is(error.statusCode, 404);
});

test('Should get a product from course id', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  let course = await thinkific.courses.getById(courseId);

  let products = await thinkific.products.getList();


  let product = await thinkific.products.getById(156665);
  t.is(product.id, 156665);
  t.is(product.productable_id, courseId);
});