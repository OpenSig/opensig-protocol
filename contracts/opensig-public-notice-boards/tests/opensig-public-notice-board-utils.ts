import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { Signature } from "../generated/OpensigPublicNoticeBoard/OpensigPublicNoticeBoard"

export function createSignatureEvent(
  time: BigInt,
  signer: Address,
  board: Bytes,
  data: Bytes
): Signature {
  let signatureEvent = changetype<Signature>(newMockEvent())

  signatureEvent.parameters = new Array()

  signatureEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromUnsignedBigInt(time))
  )
  signatureEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )
  signatureEvent.parameters.push(
    new ethereum.EventParam("board", ethereum.Value.fromFixedBytes(board))
  )
  signatureEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return signatureEvent
}
