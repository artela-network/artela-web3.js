# web3-atl-aspect

[![NPM Package][npm-image]][npm-url]

This is a sub-package of [web3.js][repo].

This is the contract package used in the `web3-eth` package.

Please read the [documentation][docs] for more.

## Installation

You can install the package either using [NPM](https://www.npmjs.com/package/web3-eth-contract) or using [Yarn](https://yarnpkg.com/package/web3-eth-contract)

### Using NPM

```bash
npm install web3-atl-aspect
```

### Using Yarn

```bash
yarn add web3-atl-aspect
```

## Usage

```js
const Aspect = require('web3-atl-aspect');

// Set provider for all later instances to use
Aspect.setProvider('ws://localhost:8546');

const aspect = new Aspect();
aspect.deploy()
    .on('receipt', function() {
        ...
    });
```

[docs]: http://web3js.readthedocs.io/en/1.0/
[repo]: https://github.com/ethereum/web3.js

## Types

All the TypeScript typings are placed in the `types` folder.

[docs]: http://web3js.readthedocs.io/en/1.0/
[repo]: https://github.com/ethereum/web3.js
[npm-image]: https://img.shields.io/npm/v/web3-eth-contract.svg
[npm-url]: https://npmjs.org/package/web3-eth-contract
