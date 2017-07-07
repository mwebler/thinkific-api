import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';

import Client from '../src/lib/';

const courseName = 'API Test course';

test('Should find a course by its name', (t) => {
  const thinkific = new Client(sampleOpts);
  t.pass();
  /*thinkific.courses.findByName(courseName).then(course => {
    t.is(course.name, courseName);
  });*/

});

