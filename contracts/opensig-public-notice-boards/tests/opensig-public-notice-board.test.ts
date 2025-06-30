import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { Signature } from "../generated/schema"
import { Signature as SignatureEvent } from "../generated/OpensigPublicNoticeBoard/OpensigPublicNoticeBoard"
import { handleSignature } from "../src/opensig-public-notice-board"
import { createSignatureEvent } from "./opensig-public-notice-board-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let time = BigInt.fromI32(234)
    let signer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let board = Bytes.fromI32(1234567890)
    let data = Bytes.fromI32(1234567890)
    let newSignatureEvent = createSignatureEvent(time, signer, board, data)
    handleSignature(newSignatureEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Signature created and stored", () => {
    assert.entityCount("Signature", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Signature",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "time",
      "234"
    )
    assert.fieldEquals(
      "Signature",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "signer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Signature",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "board",
      "1234567890"
    )
    assert.fieldEquals(
      "Signature",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
