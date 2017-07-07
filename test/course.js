import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';

import Thinkific from '../src/lib/';

const courseName = 'API Test course';

test('Should loop at course list', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  let courses = await thinkific.courses.getList();
  do {
    courses.items.forEach(c => {
      //do something with course c
        console.log(c);

    }, this);

    //get next page
    courses = await courses.getNext();
  } while (courses);
  // done looping at courses
});