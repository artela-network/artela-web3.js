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
import Aspect from "web3-eth-contract";

/**
 * @file contract-tests.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @author Samuel Furter <samuel@ethereum.org>
 * @date 2018
 */


// $ExpectType Contract
const aspect = new Aspect('0x1234567890123456789012345678901234567890');

// $ExpectType string | null
aspect.defaultAccount;

// $ExpectType BlockNumber
aspect.defaultBlock;

// $ExpectType Common
aspect.defaultCommon;

// $ExpectType hardfork
aspect.defaultHardfork;

// $ExpectType chain
aspect.defaultChain;

// $ExpectType number
aspect.transactionPollingTimeout;

// $ExpectType number
aspect.transactionConfirmationBlocks;

// $ExpectType number
aspect.transactionBlockTimeout;

// $ExpectType boolean
aspect.handleRevert;

// $ExpectType string
aspect.options.address;

// $ExpectType AbiItem[]
aspect.options.jsonInterface;

// $ExpectType string | undefined
aspect.options.from;

// $ExpectType number | undefined
aspect.options.gas;

// $ExpectType string | undefined
aspect.options.gasPrice;

// $ExpectType string | undefined
aspect.options.data;

// $ExpectType Contract
aspect.clone();

// $ExpectType ContractSendMethod
aspect.deploy({
    data: '0x12345...',
    properties: [{key: 'dummy', value: 'test'}]
});

// $ExpectType Promise<number>
aspect
    .deploy({
        data: '0x12345...',
        properties: [{key: 'dummy', value: 'test'}]
    })
    .estimateGas();

// $ExpectType Promise<number>
aspect
    .deploy({
        data: '0x12345...',
        properties: [{key: 'dummy', value: 'test'}]
    })
    .estimateGas({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' });

// $ExpectType Promise<number>
aspect
    .deploy({
        data: '0x12345...',
        properties: [{key: 'dummy', value: 'test'}]
    })
    .estimateGas((err: Error, gas: number) => {});

// $ExpectType PromiEvent<Contract>
aspect
    .deploy({
        data: '0x12345...',
        properties: [{key: 'dummy', value: 'test'}]
    })
    .send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' });

// $ExpectType PromiEvent<Contract>
aspect
    .deploy({
        data: '0x12345...',
        properties: [{key: 'dummy', value: 'test'}]
    })
    .send(
        { from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' },
        (err: Error, transactionHash: string) => {}
    );
