import { BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  DepositEvent as DepositEventEvent,
  MessageEvent as MessageEventEvent,
  WithdrawEvent as WithdrawEventEvent,
  PeanutV4,
} from "../generated/PeanutV4/PeanutV4";
import { ERC20 } from "../generated/PeanutV4/ERC20";
import {
  DepositEvent,
  MessageEvent,
  WithdrawEvent,
  Deposit,
  DepositTotals,
} from "../generated/schema";

export function handleDepositEvent(event: DepositEventEvent): void {
  let entity = new DepositEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity._index = event.params._index;
  entity._contractType = event.params._contractType;
  entity._amount = event.params._amount;
  entity._senderAddress = event.params._senderAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let contract = PeanutV4.bind(event.address);

  let deposit = Deposit.load(event.params._index.toString());

  // If the deposit does not exist, create it
  if (deposit == null) {
    let contract_deposit = contract.getDeposit(event.params._index);

    let deposit = new Deposit(event.params._index.toString());

    deposit.amount = contract_deposit.amount;
    deposit.tokenAddress = contract_deposit.tokenAddress;
    deposit.tokenTotals = contract_deposit.tokenAddress.toHexString();
    deposit.contractType = contract_deposit.contractType;
    deposit.claimed = contract_deposit.claimed;
    deposit.requiresMFA = contract_deposit.requiresMFA;
    deposit.timestamp = contract_deposit.timestamp;
    deposit.tokenId = contract_deposit.tokenId;
    deposit.senderAddress = contract_deposit.senderAddress;

    deposit.save();
    // Create addressZero variable

    // if the deposit is an ERC20 or ETH
    if (contract_deposit.contractType == 0) {
      // Check if a DepositTotals entity exists with addresszero
      let depositTotals = DepositTotals.load(
        contract_deposit.tokenAddress.toHexString(),
      );

      // If it does not exist, create it
      if (depositTotals == null) {
        depositTotals = new DepositTotals(
          contract_deposit.tokenAddress.toHexString(),
        );
        depositTotals.tokenAddress = contract_deposit.tokenAddress;
        depositTotals.totalDeposited = contract_deposit.amount;
        depositTotals.name = "Ethereum";
        depositTotals.symbol = "ETH";
        depositTotals.decimals = 18;
        depositTotals.totalDeposists = BigInt.fromI32(1);
      } else {
        depositTotals.totalDeposited = depositTotals.totalDeposited.plus(
          contract_deposit.amount,
        );
        depositTotals.totalDeposists = depositTotals.totalDeposists.plus(
          BigInt.fromI32(1),
        );
      }
      depositTotals.save();
    } else if (contract_deposit.contractType == 1) {
      // Check if a DepositTotals entity exists with the token address
      let depositTotals = DepositTotals.load(
        contract_deposit.tokenAddress.toHexString(),
      );

      // If it does not exist, create it
      if (depositTotals == null) {
        depositTotals = new DepositTotals(
          contract_deposit.tokenAddress.toHexString(),
        );
        depositTotals.tokenAddress = contract_deposit.tokenAddress;
        depositTotals.totalDeposited = contract_deposit.amount;
        let erc20 = ERC20.bind(contract_deposit.tokenAddress);
        depositTotals.name = erc20.name();
        depositTotals.symbol = erc20.symbol();
        depositTotals.decimals = erc20.decimals();
        depositTotals.totalDeposists = BigInt.fromI32(1);
      } else {
        depositTotals.totalDeposited = depositTotals.totalDeposited.plus(
          contract_deposit.amount,
        );
        depositTotals.totalDeposists = depositTotals.totalDeposists.plus(
          BigInt.fromI32(1),
        );
      }
      depositTotals.save();
    }
  }
}

export function handleMessageEvent(event: MessageEventEvent): void {
  let entity = new MessageEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.message = event.params.message;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdrawEvent(event: WithdrawEventEvent): void {
  let entity = new WithdrawEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity._index = event.params._index;
  entity._contractType = event.params._contractType;
  entity._amount = event.params._amount;
  entity._recipientAddress = event.params._recipientAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
