// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {BaseScript, console2} from "./Base.s.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is BaseScript {
  function deployCounter(DeployementChain chain) public broadcastOn(chain) {
    Counter counter = new Counter();

    _saveDeployment(address(counter), "Counter");
  }
}
