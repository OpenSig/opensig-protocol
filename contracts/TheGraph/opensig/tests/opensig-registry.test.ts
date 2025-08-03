import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { Signature } from "../generated/schema"
import { Signature as SignatureEvent } from "../generated/OpensigRegistry/OpensigRegistry"
import { handleSignature } from "../src/opensig-registry"
import { createSignatureEvent } from "./opensig-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let time = BigInt.fromI32(234)
    let signer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let signature = Bytes.fromI32(1234567890)
    let data = Bytes.fromI32(1234567890)
    let newSignatureEvent = createSignatureEvent(time, signer, signature, data)
    handleSignature(newSignatureEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

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
      "signature",
      "1234567890"
    )
    assert.fieldEquals(
      "Signature",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "data",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
