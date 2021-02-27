# next-build-cache

_Next Build Cache_ is a ultra simple file-based caching solution built for usage during the Next.js build process to pass data from `getStaticPaths` to `getStaticProps` without re-fetching data.

### The Problem:
Next.js calls separate workers for `getStaticPaths` and `getStaticProps`, which means that data cannot be cached in-memory to re-use in `getStaticProps`. 


## Installation

Using npm

```bash
$ npm i next-build-cache
```

Using yarn

```bash
$ yarn add next-build-cache
```

## Usage

```javascript
// using es modules 
import { accessCache } from 'next-build-cache';
// using commonjs
const { accessCache } = require('next-build-cache');

// access the cache using the file 'build.cache'
const cache = accessCache('build.cache');

// save a key-value pair with a specified time to live in ms
await cache.put('mykey', 'myvalue', 1000);

// get the value of a key
const value = await cache.get('mykey');
```

## License
[MIT](https://choosealicense.com/licenses/mit/)