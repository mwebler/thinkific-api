# thinkific-api

[![github-issues](https://img.shields.io/github/issues/mwebler/thinkific-api.svg)](https://github.com/mwebler/thinkific-api/issues)
[![travis-status](https://img.shields.io/travis/mwebler/thinkific-api.svg)](https://travis-ci.org/mwebler/thinkific-api)

Thinkific API javascript wrapper

> This package is built for Node.js 7.10+ (with support for classes and async/await)

## Features
//TODO

## Install
Install the npm module from Github:
```sh
npm install mwebler/thinkific-api
```

## Documentation
http://mwebler.me/thinkific-api/Thinkific.html

## Usage

Creating a new thinkific API handler
```js
import Thinkific from '../src/lib/';

const options = {};
options.apiKey = 'teste-key';
options.subdomain = 'webler.test.thinkific.com';
const thinkific = new Thinkific(options);
```

Looping at resource list
```js
let courses = await thinkific.courses.getList();
do {
  courses.items.forEach(c => {
    //do something with course c
  }, this);

  //get next page
  courses = await courses.getNext();
} while (courses);
// done looping at courses
```

CRUD at resource
```js
/* CREATE */
let p = await thinkific.promotions.create(promo);

/* UPDATE */
const newName = "updated name";
const newPromo = Object.assign({}, promo);
newPromo.name = newName;

await thinkific.promotions.put(p.id, newPromo);

/* READ SINGLE*/
p = await thinkific.promotions.getById(p.id);

/* DELETE */
await thinkific.promotions.delete(p.id);
```

## Author

Matheus Webler matheus.webler@gmail.com https://github.com/mwebler

## License

- **Apache 2.0**

## Contributing

Contributions are highly welcome!
