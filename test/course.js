import test from 'ava';
import 'babel-core/register';
import sampleOpts from './test-helper';
import errors from 'request-promise/errors';

import Thinkific from '../src/lib/';

const courseName = 'API Test course';

test('Should loop at course list', async (t) => {
  const thinkific = new Thinkific(sampleOpts);

  let courses = await thinkific.courses.getList();
  do {
    courses.items.forEach(c => {
      //do something with course c

    }, this);

    //get next page
    courses = await courses.getNext();
  } while (courses);
  // done looping at courses
});

test('Should get a course by its id', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  let course = await thinkific.courses.getById('143618');
  t.pass(course.id, '143618');
});

test('Should get assertion for course not found', async (t) => {
  const thinkific = new Thinkific(sampleOpts);
  const error = await t.throws(thinkific.courses.getById('00000'));
  t.is(error.statusCode, 404);
});