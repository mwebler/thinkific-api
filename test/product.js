import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import Thinkific from '../src/lib/';

/* Currently we are not able to create products from API
  Expect the have a product with this id related to an existing course */
const courseId = 143618;
const productId = 156665;

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
  let product = await thinkific.products.getById(productId);
  t.is(product.id, productId);
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


  let product = await thinkific.products.getById(productId);
  t.is(product.id, productId);
  t.is(product.productable_id, courseId);
});