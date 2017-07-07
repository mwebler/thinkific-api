import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';

import config  from '../src/lib/config';


test('API endpoint should be v1', (t) => {
  t.is(config.api, 'https://api.thinkific.com/api/public/v1');
});
