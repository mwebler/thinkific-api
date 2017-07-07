import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';

import Client from '../src/lib/index';

test('Should create a client with options', (t) => {
  const c = new Client(sampleOpts);

  t.is(c.apiKey, sampleOpts.apiKey);
  t.is(c.subdomain, sampleOpts.subdomain);
});

test('Should not create an client without options', (t) => {
  t.throws(() => {
    const c = new Client();
  });
});

test('Should not create a client without key', (t) => {
   t.throws(() => {
    const c = new Client({ subdomain: sampleOpts.subdomain });
   });
});

test('Should not create a client without subdomain', (t) => {
  t.throws(() => {
    const c = new Client({ apiKey: sampleOpts.apiKey });
  });
});
