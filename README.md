# wandboxjs

Wandbox API Wrapper for Node.js TS Rewrite

## Installation

Just type `npm i wandboxjs` and you are ready to go!

## Usage

ES5 Syntax

```js
const { compiler } = require("wandboxjs");
compiler("python", "print(1)").then((result) => console.log(result.result)); // -> 1
```

ES6 Syntax

```js
import { compiler } from "wandboxjs";

const main = async () => {
  result = await compiler("python", "print(1)");

  console.log(result.result); // -> 1
};

main();
```
