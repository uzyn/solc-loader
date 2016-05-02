# solc loader for webpack

Compiles `.sol` with [JavaScript Solidity compiler](https://github.com/chriseth/browser-solidity) and returns JavaScript objects with Application Binary Interface (ABI) and bytecode ready to be deployed on to Ethereum.

Ideally to be used with [web3-loader](https://github.com/uzyn/web3-loader) for automatic deployment and ready-to-use JavaScript instances of smart contracts.

##### Sample code

Sample dapp or starter kit can be found at [uzyn/ethereum-webpack-example-dapp](https://github.com/uzyn/ethereum-webpack-example-dapp).

## Installation

```bash
npm install solc-loader --save-dev
```

## Usage

```js
var SmartContracts = require('solc!./SmartContracts.sol');
// => returns SmartContracts array with each contract name, bytecode and abi.
```

### Example webpack config

At your project's `webpack.config.js`:

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.sol$/,
        loaders: ['solc']
    ]
  }
}
```

### Recommended usage with web3-loader

`solc-loader` would be much sweeter if used along `web3-loader`. `web3-loader` automatically deploys new/changed contracts on to Ethereum and returns ready-to-use JavaScript instances of smart contracts.

At your project's `webpack.config.js`:

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.sol$/,
        loaders: ['web3', 'solc']
    ]
  }
}
```

## Extra configuration

### Optimization

`solc-loader` is set, by default, to compile with optimization turned on.

To turn off optimization, pass `optimize=0` via either query or loader config with the key `solcLoader`.

#### Query style

```js
loaders: ['solc?optimize=0']

// or
loader: 'solc?optimize=0'
```

#### Config style

```js
// webpack.config.js
module.exports = {
  solcLoader: {
    optimize: 0
  }
}
```

## License
MIT · [U-Zyn Chua](http://uzyn.com) ([@uzyn](http://twitter.com/uzyn))

Tips: `0xFfA57D3e88A24311565C9929F180739E43FBD0aA`
