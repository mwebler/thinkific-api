import test from 'ava';
import 'babel-core/register';

import Client from '../src/lib/';

const sampleOpts = { apiKey: 'teste-key', subdomain: 'webler.test.thinkific.com' };

test('Should create a client with options', (t) => {
  const c = new Client(sampleOpts);

  t.is(c.apiKey, sampleOpts.apiKey);
  t.is(c.subdomain, sampleOpts.subdomain);
});

test('Should not create an client without options', (t) => {
  try {
    const c = new Client();

    t.fail(c);
  } catch (error) {
    t.pass();
  }
});

test('Should not create a client without key', (t) => {
  try {
    const c = new Client({ subdomain: sampleOpts.subdomain });

    t.fail(c);
  } catch (error) {
    t.pass();
  }
});

test('Should not create a client without subdomain', (t) => {
  try {
    const c = new Client({ apiKey: sampleOpts.apiKey });

    t.fail(c);
  } catch (error) {
    t.pass();
  }
});
