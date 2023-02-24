/* eslint-disable prefer-const */
import { ethereum } from "@graphprotocol/graph-ts";

import { Transfer as TransferEvent } from "../../generated/usdt/usdt";
import { Block, Transfer, Transaction } from "../../generated/schema";

export function handleTransferEvent(event: TransferEvent): void {
  const transfer = new Transfer(event.transaction.hash.toHex());
  transfer.hash = event.transaction.hash;
  transfer.sender = event.params.from;
  transfer.receiver = event.params.to;
  transfer.amount = event.params.value;
  transfer.contract = event.address;
  transfer.gasUsed = event.transaction.gasPrice;
  transfer.timeStamp = event.block.timestamp;
  transfer.blockNumber = event.block.number;
  transfer.save();

  saveBlock(event.block);
  saveTransaction(event.transaction);
}

function saveBlock(block: ethereum.Block): void {
  const entity = new Block(block.hash.toHex());
  entity.gasUsed = block.gasUsed;
  entity.hash = block.hash;
  entity.number = block.number;
  entity.parentHash = block.parentHash;
  entity.timestamp = block.timestamp;
  entity.save();
}

function saveTransaction(tx: ethereum.Transaction): void {
  const entity = new Transaction(tx.hash.toHex());
  entity.hash = tx.hash;
  entity.index = tx.index;
  entity.from = tx.from;
  entity.to = tx.to;
  entity.value = tx.value;
  entity.gasLimit = tx.gasLimit;
  entity.gasPrice = tx.gasPrice;
  entity.input = tx.input;
  entity.nounce = tx.nonce;
  entity.save();
}
