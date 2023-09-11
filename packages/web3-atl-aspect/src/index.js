/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file aspect.js
 *
 * To initialize a contract use:
 *
 *  var Aspect = require('web3-atl-aspect');
 *  Aspect.setProvider('ws://localhost:8546');
 *  var aspect = new Aspect(address, ...);
 *
 * @author Jack Li <jack@artela.network>
 * @date 2023
 */


"use strict";

const core = require('@artela/web3-core');
const Method = require('@artela/web3-core-method');
const utils = require('@artela/web3-utils');
// const Subscription = require('web3-core-subscriptions').subscription;
const Contract = require('@artela/web3-eth-contract');
const formatters = require('web3-core-helpers').formatters;
const errors = require('web3-core-helpers').errors;
const promiEvent = require('web3-core-promievent');
const abi = require('web3-eth-abi');
const {getContractAddress} = require("@ethersproject/address");
const {aspectCoreAddr} = require("@artela/web3-utils");

/**
 * Should be called to create new aspect instance
 *
 * @method Aspect
 * @constructor
 * @param {String} address
 * @param {Object} options
 */
var Aspect = function Aspect(address, options) {
    var _this = this,
        args = Array.prototype.slice.call(arguments);

    if(!(this instanceof Aspect)) {
        throw new Error('Please use the "new" keyword to instantiate a web3.atl.Aspect() object!');
    }

    this.setProvider = function () {
        core.packageInit(_this, arguments);

        _this.clearSubscriptions = _this._requestManager.clearSubscriptions;
    };

    // sets _requestmanager
    core.packageInit(this, [this.constructor]);

    this.clearSubscriptions = this._requestManager.clearSubscriptions;

    // create the options object
    this.options = {};

    var lastArg = args[args.length - 1];
    if(!!lastArg && typeof lastArg === 'object' && !Array.isArray(lastArg)) {
        options = lastArg;

        this.options = { ...this.options, ...this._getOrSetDefaultOptions(options)};
        if(!!address && typeof address === 'object') {
            address = null;
        }
    }

    // set address
    Object.defineProperty(this.options, 'address', {
        set: function(value){
            if(value) {
                _this._address = utils.toChecksumAddress(formatters.inputAddressFormatter(value));
            }
        },
        get: function(){
            return _this._address;
        },
        enumerable: true
    });

    // get default account from the Class
    var defaultAccount = this.constructor.defaultAccount;
    var defaultBlock = this.constructor.defaultBlock || 'latest';

    Object.defineProperty(this, 'handleRevert', {
        get: function () {
            if (_this.options.handleRevert === false || _this.options.handleRevert === true) {
                return _this.options.handleRevert;
            }

            return this.constructor.handleRevert;
        },
        set: function (val) {
            _this.options.handleRevert = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultCommon', {
        get: function () {
            return _this.options.common || this.constructor.defaultCommon;
        },
        set: function (val) {
            _this.options.common = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultHardfork', {
        get: function () {
            return _this.options.hardfork || this.constructor.defaultHardfork;
        },
        set: function (val) {
            _this.options.hardfork = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultChain', {
        get: function () {
            return _this.options.chain || this.constructor.defaultChain;
        },
        set: function (val) {
            _this.options.chain = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionPollingTimeout', {
        get: function () {
            if (_this.options.transactionPollingTimeout === 0) {
                return _this.options.transactionPollingTimeout;
            }

            return _this.options.transactionPollingTimeout || this.constructor.transactionPollingTimeout;
        },
        set: function (val) {
            _this.options.transactionPollingTimeout = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionPollingInterval', {
        get: function () {
            if (_this.options.transactionPollingInterval === 0) {
                return _this.options.transactionPollingInterval;
            }

            return _this.options.transactionPollingInterval || this.constructor.transactionPollingInterval;
        },
        set: function (val) {
            _this.options.transactionPollingInterval = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionConfirmationBlocks', {
        get: function () {
            if (_this.options.transactionConfirmationBlocks === 0) {
                return _this.options.transactionConfirmationBlocks;
            }

            return _this.options.transactionConfirmationBlocks || this.constructor.transactionConfirmationBlocks;
        },
        set: function (val) {
            _this.options.transactionConfirmationBlocks = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionBlockTimeout', {
        get: function () {
            if (_this.options.transactionBlockTimeout === 0) {
                return _this.options.transactionBlockTimeout;
            }

            return _this.options.transactionBlockTimeout || this.constructor.transactionBlockTimeout;
        },
        set: function (val) {
            _this.options.transactionBlockTimeout = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'blockHeaderTimeout', {
        get: function () {
            if (_this.options.blockHeaderTimeout === 0) {
                return _this.options.blockHeaderTimeout;
            }

            return _this.options.blockHeaderTimeout || this.constructor.blockHeaderTimeout;
        },
        set: function (val) {
            _this.options.blockHeaderTimeout = val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                defaultAccount = utils.toChecksumAddress(formatters.inputAddressFormatter(val));
            }

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;

            return val;
        },
        enumerable: true
    });

    this._address = null;
    this._aspectCore = Contract.aspectCore(this.options)

    // set getter/setter properties
    this.options.address = address;
};

/**
 * Sets the new provider, creates a new requestManager, registers the "data" listener on the provider and sets the
 * accounts module for the Contract class.
 *
 * @method setProvider
 *
 * @param {string|provider} provider
 * @param {Accounts} accounts
 *
 * @returns void
 */
Aspect.setProvider = function(provider, accounts) {
    // Contract.currentProvider = provider;
    core.packageInit(this, [provider]);

    this._ethAccounts = accounts;
};


/**
 * Get the callback and modify the array if necessary
 *
 * @method _getCallback
 * @param {Array} args
 * @return {Function} the callback
 */
Aspect.prototype._getCallback = function getCallback(args) {
    if (args && !!args[args.length- 1 ] && typeof args[args.length - 1] === 'function') {
        return args.pop(); // modify the args array!
    }
};

/**
 * Checks that no listener with name "newListener" or "removeListener" is added.
 *
 * @method _checkListener
 * @param {String} type
 * @param {String} event
 * @return {Object} the contract instance
 */
Aspect.prototype._checkListener = function(type, event){
    if(event === type) {
        throw errors.ContractReservedEventError(type);
    }
};


/**
 * Use default values, if options are not available
 *
 * @method _getOrSetDefaultOptions
 * @param {Object} options the options gived by the user
 * @return {Object} the options with gaps filled by defaults
 */
Aspect.prototype._getOrSetDefaultOptions = function getOrSetDefaultOptions(options) {
    var _options = { ...options };
    var gasPrice = _options.gasPrice ? String(_options.gasPrice): null;
    var from = _options.from ? utils.toChecksumAddress(formatters.inputAddressFormatter(_options.from)) : null;

    _options.data = _options.data || this.options.data;

    _options.from = from || this.options.from;
    _options.gasPrice = gasPrice || this.options.gasPrice;
    _options.gas = _options.gas || _options.gasLimit || this.options.gas;

    // TODO replace with only gasLimit?
    delete _options.gasLimit;

    return _options;
};


/**
 * Deploys an Aspect and fire events based on its state: transactionHash, receipt
 *
 * All event listeners will be removed, once the last possible event is fired ("error", or "receipt")
 *
 * @method deploy
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} EventEmitter possible events are "error", "transactionHash" and "receipt"
 */
Aspect.prototype.deploy = function(options, callback){
    options = options || {};
    options = this._getOrSetDefaultOptions(options);

    // throw error, if no "data" is specified
    if(!options.data) {
        if (typeof callback === 'function'){
            return callback(errors.ContractMissingDeployDataError());
        }
        throw errors.ContractMissingDeployDataError();
    }
    if (!options.paymaster) {
        throw errors.ContractMissingDeployDataError();
    }

    options.properties = options.properties || []
    options.proof = options.proof || '0x00';

    const deploy = this._aspectCore.options.jsonInterface.find((method) => {
        return (method.type === 'function' && method.name === 'deploy');
    });

    return this._createTxObject.apply({
        method: deploy,
        parent: this,
        _ethAccounts: this.constructor._ethAccounts
    }, [options.data, options.properties, options.paymaster, options.proof]);
};

/**
 * Upgrade an Aspect and fire events based on its state: transactionHash, receipt
 *
 * All event listeners will be removed, once the last possible event is fired ("error", or "receipt")
 *
 * @method upgrade
 * @param {Object} options
 * @param {Function} callback
 * @return {Object} EventEmitter possible events are "error", "transactionHash" and "receipt"
 */
Aspect.prototype.upgrade = function(options, callback){
    options = options || {};
    options = this._getOrSetDefaultOptions(options);

    // throw error, if no "data" is specified
    if(!options.data) {
        if (typeof callback === 'function'){
            return callback(errors.ContractMissingDeployDataError());
        }
        throw errors.ContractMissingDeployDataError();
    }

    if (!this.options.address) {
        throw errors.ContractNoAddressDefinedError();
    }

    const upgrade = this._aspectCore.options.jsonInterface.find((method) => {
        return (method.type === 'function' && method.name === 'upgrade');
    });

    return this._createTxObject.apply({
        method: upgrade,
        parent: this,
        _ethAccounts: this.constructor._ethAccounts
    }, [this.options.address, options.data, options.properties]);
};

/**
 * Rawcall an Aspect's operational interface and fire events based on its state: transactionHash, receipt
 *
 * All event listeners will be removed, once the last possible event is fired ("error", or "receipt")
 *
 * @method rawcall
 * @param {Object} encodedArgs
 * @param {Function} callback
 * @return {Object} EventEmitter possible events are "error", "transactionHash" and "receipt"
 */
Aspect.prototype.rawcall = function(encodedArgs, callback){
    const entrypoint = this._aspectCore.options.jsonInterface.find((method) => {
        return (method.type === 'function' && method.name === 'entrypoint');
    });

    return this._createTxObject.apply({
        method: entrypoint,
        parent: this,
        _ethAccounts: this.constructor._ethAccounts
    }, [encodedArgs]);
};

/**
 * Adds event listeners and creates a subscription, and remove it once its fired.
 *
 * @method clone
 * @return {Object} the event subscription
 */
Aspect.prototype.clone = function() {
    return new this.constructor(this.options.address, this.options);
};

/**
 * returns the an object with call, send, estimate functions
 *
 * @method _createTxObject
 * @returns {Object} an object with functions to call the methods
 */
Aspect.prototype._createTxObject =  function _createTxObject(){
    var args = Array.prototype.slice.call(arguments);
    var txObject = {};

    if(this.method.type === 'function') {

        txObject.call = this.parent._executeMethod.bind(txObject, 'call');
        txObject.call.request = this.parent._executeMethod.bind(txObject, 'call', true); // to make batch requests

    }

    txObject.send = this.parent._executeMethod.bind(txObject, 'send');
    txObject.send.request = this.parent._executeMethod.bind(txObject, 'send', true); // to make batch requests
    txObject.encodeABI = this.parent._encodeMethodABI.bind(txObject);
    txObject.estimateGas = this.parent._executeMethod.bind(txObject, 'estimate');

    if (args && this.method.inputs && args.length !== this.method.inputs.length) {
        if (this.nextMethod) {
            return this.nextMethod.apply(null, args);
        }
        throw errors.InvalidNumberOfParams(args.length, this.method.inputs.length, this.method.name);
    }

    txObject.arguments = args || [];
    txObject._method = this.method;
    txObject._parent = this.parent;
    txObject._ethAccounts = this.parent.constructor._ethAccounts || this._ethAccounts;

    return txObject;
};


/**
 * Generates the options for the execute call
 *
 * @method _processExecuteArguments
 * @param {Array} args
 * @param {Promise} defer
 */
Aspect.prototype._processExecuteArguments = function _processExecuteArguments(args, defer) {
    var processedArgs = {};

    processedArgs.type = args.shift();

    // get the callback
    processedArgs.callback = this._parent._getCallback(args);

    // get block number to use for call
    if(processedArgs.type === 'call' && args[args.length - 1] !== true && (typeof args[args.length - 1] === 'string' || isFinite(args[args.length - 1])))
        processedArgs.defaultBlock = args.pop();

    // get the options
    processedArgs.options = (!!args[args.length - 1] && typeof args[args.length - 1]) === 'object' ? args.pop() : {};

    // get the generateRequest argument for batch requests
    processedArgs.generateRequest = (args[args.length - 1] === true)? args.pop() : false;

    processedArgs.options = this._parent._getOrSetDefaultOptions(processedArgs.options);
    processedArgs.options.data = this.encodeABI();

    processedArgs.options.to = aspectCoreAddr;

    // return error, if no "data" is specified
    if(!processedArgs.options.data)
        return utils._fireError(new Error('Couldn\'t find a matching contract method, or the number of parameters is wrong.'), defer.eventEmitter, defer.reject, processedArgs.callback);

    return processedArgs;
};

/**
 * Encodes an ABI for a method, including signature or the method.
 * Or when constructor encodes only the constructor parameters.
 *
 * @method _encodeMethodABI
 * @param {Mixed} args the arguments to encode
 * @param {String} the encoded ABI
 */
Aspect.prototype._encodeMethodABI = function _encodeMethodABI() {
    var methodSignature = this._method.signature,
        args = this.arguments || [];

    var signature = false,
        paramsABI = this._parent._aspectCore.options.jsonInterface.filter(function (json) {
            return ((methodSignature === 'constructor' && json.type === methodSignature) ||
                ((json.signature === methodSignature || json.signature === methodSignature.replace('0x','') || json.name === methodSignature) && json.type === 'function'));
        }).map(function (json) {
            var inputLength = (Array.isArray(json.inputs)) ? json.inputs.length : 0;

            if (inputLength !== args.length) {
                throw new Error('The number of arguments is not matching the methods required number. You need to pass '+ inputLength +' arguments.');
            }

            if (json.type === 'function') {
                signature = json.signature;
            }
            return Array.isArray(json.inputs) ? json.inputs : [];
        }).map(function (inputs) {
            return abi.encodeParameters(inputs, args).replace('0x','');
        })[0] || '';

    // return method
    var returnValue = (signature) ? signature + paramsABI : paramsABI;

    if(!returnValue) {
        throw new Error('Couldn\'t find a matching contract method named "'+ this._method.name +'".');
    }

    return returnValue;
};

/**
 * Executes a call, transact or estimateGas on a contract function
 *
 * @method _executeMethod
 * @param {String} type the type this execute function should execute
 * @param {Boolean} makeRequest if true, it simply returns the request parameters, rather than executing it
 */
Aspect.prototype._executeMethod = function _executeMethod(){
    var _this = this,
        args = this._parent._processExecuteArguments.call(this, Array.prototype.slice.call(arguments), defer),
        defer = promiEvent((args.type !== 'send')),
        ethAccounts = _this.constructor._ethAccounts || _this._ethAccounts;

    // simple return request for batch requests
    if(args.generateRequest) {

        var payload = {
            params: [formatters.inputCallFormatter.call(this._parent, args.options)],
            callback: args.callback
        };

        if(args.type === 'call') {
            payload.params.push(formatters.inputDefaultBlockNumberFormatter.call(this._parent, args.defaultBlock));
            payload.method = 'eth_call';
            payload.format = this._parent._decodeMethodReturn.bind(null, this._method.outputs);
        } else {
            payload.method = 'eth_sendTransaction';
        }

        return payload;

    }

    switch (args.type) {
        case 'estimate':

            var estimateGas = (new Method({
                name: 'estimateGas',
                call: 'eth_estimateGas',
                params: 1,
                inputFormatter: [formatters.inputCallFormatter],
                outputFormatter: utils.hexToNumber,
                requestManager: _this._parent._requestManager,
                accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
                defaultAccount: _this._parent.defaultAccount,
                defaultBlock: _this._parent.defaultBlock
            })).createFunction();

            return estimateGas(args.options, args.callback);

        case 'call':

            // TODO check errors: missing "from" should give error on deploy and send, call ?

            var call = (new Method({
                name: 'call',
                call: 'eth_call',
                params: 2,
                inputFormatter: [formatters.inputCallFormatter, formatters.inputDefaultBlockNumberFormatter],
                // add output formatter for decoding
                outputFormatter: function (result) {
                    return _this._parent._decodeMethodReturn(_this._method.outputs, result);
                },
                requestManager: _this._parent._requestManager,
                accounts: ethAccounts, // is eth.accounts (necessary for wallet signing)
                defaultAccount: _this._parent.defaultAccount,
                defaultBlock: _this._parent.defaultBlock,
                handleRevert: _this._parent.handleRevert,
                abiCoder: abi
            })).createFunction();

            return call(args.options, args.defaultBlock, args.callback);

        case 'send':

            // return error, if no "from" is specified
            if(!utils.isAddress(args.options.from)) {
                return utils._fireError(errors.ContractNoFromAddressDefinedError(), defer.eventEmitter, defer.reject, args.callback);
            }

            if (typeof this._method.payable === 'boolean' && !this._method.payable && args.options.value && args.options.value > 0) {
                return utils._fireError(new Error('Can not send value to non-payable contract method or constructor'), defer.eventEmitter, defer.reject, args.callback);
            }


            // make sure receipt logs are decoded
            var extraFormatters = {
                aspectDeployFormatter: function (receipt) {
                    let newAspect = _this._parent.clone();
                    newAspect.options.address = getContractAddress(args.options);
                    return newAspect;
                }
            };

            var sendTransaction = (new Method({
                name: 'sendTransaction',
                call: 'eth_sendTransaction',
                params: 1,
                inputFormatter: [formatters.inputTransactionFormatter],
                requestManager: _this._parent._requestManager,
                accounts: _this.constructor._ethAccounts || _this._ethAccounts, // is eth.accounts (necessary for wallet signing)
                defaultAccount: _this._parent.defaultAccount,
                defaultBlock: _this._parent.defaultBlock,
                transactionBlockTimeout: _this._parent.transactionBlockTimeout,
                transactionConfirmationBlocks: _this._parent.transactionConfirmationBlocks,
                transactionPollingTimeout: _this._parent.transactionPollingTimeout,
                transactionPollingInterval: _this._parent.transactionPollingInterval,
                defaultCommon: _this._parent.defaultCommon,
                defaultChain: _this._parent.defaultChain,
                defaultHardfork: _this._parent.defaultHardfork,
                handleRevert: _this._parent.handleRevert,
                extraFormatters: extraFormatters,
                abiCoder: abi
            })).createFunction();

            return sendTransaction(args.options, args.callback);

        default:
            throw new Error('Method "' + args.type + '" not implemented.');

    }


};

module.exports = Aspect;
