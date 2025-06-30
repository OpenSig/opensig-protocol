// SPDX-License-Identifier: MIT

pragma solidity ^0.8.29;


/**
 * @title Opensig Registry
 * @author Bubble Protocol
 *
 * EVM version of the OpenSig public notice board registry.  Signatures can be registered once.
 */
contract OpensigPublicNoticeBoard {

    /**
     * @dev The chain ID of the current blockchain. Used to prevent cross-chain replay attacks.
     */
    uint32 public immutable CHAIN_ID = uint32(block.chainid);

    /**
     * @dev emitted each time a new published signature is registered.
     */
    event Signature(uint256 time, address indexed signer, bytes32 indexed board, bytes data);

    /**
     * @dev registry of published signatures.
     */
    mapping (bytes32 => bool) private signatures;

    /**
     * @dev Notarizes the given data as a transaction on the blockchain.
     * Event is emitted along with the notice board id, signer and block timestamp.
     */
    function notarize(bytes32 board, bytes32 nonce, bytes memory data) public {
        require(!signatures[nonce], "signature already published");
        uint32 chainId = uint32(bytes4(nonce));
        require(chainId == CHAIN_ID, "chain id mismatch");
        signatures[nonce] = true;
        emit Signature(block.timestamp, msg.sender, board, data);
    }

    /**
     * @dev Returns true if the given nonce has already been used
     */
    function isNotarized(bytes32 nonce) public view returns (bool) {
        return signatures[nonce];
    }

}
