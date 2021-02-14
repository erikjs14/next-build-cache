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
$ yarn next-build-cache
```

## Usage

```javascript
import Cache from 'next-build-cache';

// Create a new cache instance using the file 'build.cache'
const BuildCache = new Cache('build.cache');

// save a key-value pair with a specified time to live in ms
BuildCache.put('mykey', 'myvalue', 1000);

// get the value of a key
BuildCache.get('mykey');
```

## License
[MIT](https://choosealicense.com/licenses/mit/)