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
 * @file index.d.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */

import BN = require('bn.js');
import {Common, PromiEvent, provider, hardfork, chain, BlockNumber} from '@artela/web3-core';
import {Accounts} from 'web3-eth-accounts';
import {AbiItem} from '@artela/web3-utils';
import Contract from "@artela/web3-eth-contract";

export class Aspect {
    constructor(
        address?: string,
        options?: AspectOptions
    );

    static setProvider(provider: provider, accounts?: Accounts): void;

    private _address: string;
    private _aspectCore: Contract;
    defaultAccount: string | null;
    defaultBlock: BlockNumber;
    defaultCommon: Common;
    defaultHardfork: hardfork;
    defaultChain: chain;
    transactionPollingTimeout: number;
    transactionConfirmationBlocks: number;
    transactionBlockTimeout: number;
    handleRevert: boolean;

    options: Options;

    clone(): Aspect;

    deploy(options: DeployOrUpgradeOptions): AspectSendMethod;

    upgrade(options: DeployOrUpgradeOptions): AspectSendMethod;

    version(): AspectSendMethod;

    contracts(): AspectSendMethod;

    properties(options: QueryPropertyOptions): AspectProperties;
}

export interface AspectProperties {
    set(key: string, value: string): AspectUpdatingProperties;

    get(key: string): AspectLoadingProperties;

    getAll(): AspectLoadingProperties;
}

export interface AspectUpdatingProperties extends AspectSendMethod {
    set(key: string, value: string): AspectUpdatingProperties;
}

export interface AspectLoadingProperties extends AspectCallOnlyMethod {
    get(key: string): AspectLoadingProperties;

    getAll(): AspectLoadingProperties;
}

export interface Options extends AspectOptions {
    address: string;
    jsonInterface: AbiItem[];
}

export interface DeployOrUpgradeOptions {
    data: string;
    properties?: KVPair[];
}

export interface QueryPropertyOptions {
    keys: string[];
}

export interface KVPair {
    key: string;
    value: string;
}

export interface AspectCallOnlyMethod {
    call(
        options?: CallOptions,
        callback?: (err: Error, result: any) => void
    ): Promise<any>;

    estimateGas(
        options: EstimateGasOptions,
        callback?: (err: Error, gas: number) => void
    ): Promise<number>;

    estimateGas(callback: (err: Error, gas: number) => void): Promise<number>;

    estimateGas(
        options: EstimateGasOptions,
        callback: (err: Error, gas: number) => void
    ): Promise<number>;

    estimateGas(options: EstimateGasOptions): Promise<number>;

    estimateGas(): Promise<number>;
}

export interface AspectSendMethod extends AspectCallOnlyMethod {
    send(
        options: SendOptions,
        callback?: (err: Error, transactionHash: string) => void
    ): PromiEvent<Aspect>;
}

export interface CallOptions {
    from?: string;
    gasPrice?: string;
    gas?: number;
}

export interface SendOptions {
    from: string;
    gasPrice?: string;
    gas?: number;
    value?: number | string | BN;
    nonce?: number;
}

export interface EstimateGasOptions {
    from?: string;
    gas?: number;
    value?: number | string | BN;
}

export interface AspectOptions {
    // Sender to use for contract calls
    from?: string;
    // Gas price to use for contract calls
    gasPrice?: string;
    // Gas to use for contract calls
    gas?: number;
    // Aspect WASM code
    data?: string;
}

export default Aspect
