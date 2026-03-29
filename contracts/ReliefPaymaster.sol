// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";
import "@account-abstraction/contracts/core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title ReliefPaymaster
 * @notice ERC-4337 Paymaster for gasless onboarding in Sahayog.
 * @dev Sponsors specific interactions with the Relief protocol.
 */
contract ReliefPaymaster is BasePaymaster {
    using ECDSA for bytes32;

    mapping(address => bool) public sponsoredContracts;
    address public signer;

    constructor(IEntryPoint _entryPoint, address _initialOwner, address _signer) BasePaymaster(_entryPoint) {
        _transferOwnership(_initialOwner);
        signer = _signer;
    }

    function setSponsoredContract(address _contract, bool _status) external onlyOwner {
        sponsoredContracts[_contract] = _status;
    }

    function setSigner(address _signer) external onlyOwner {
        signer = _signer;
    }

    /**
     * @notice Basic validation: check if the target contract is sponsored.
     * @dev In production, this would also verify a signature from the Relief backend.
     */
    function _validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 /*maxCost*/
    ) internal view override returns (bytes memory context, uint256 validationData) {
        // Decode the callData to see the target
        (address target, , ) = abi.decode(userOp.callData[4:], (address, uint256, bytes));
        
        // Only sponsor if the target is a registered Relief contract
        if (sponsoredContracts[target]) {
            return ("", 0);
        }

        // Otherwise, require a signature from the backend (passed in paymasterAndData)
        // paymasterAndData = [address(this) | signature]
        if (userOp.paymasterAndData.length >= 20 + 65) {
            bytes memory signature = bytes(userOp.paymasterAndData[20:]);
            bytes32 hash = keccak256(abi.encode(userOp.sender, userOp.nonce, target));
            if (hash.toEthSignedMessageHash().recover(signature) == signer) {
                return ("", 0);
            }
        }

        return ("", 1); // Reject sponsorship
    }

    function _postOp(
        PostOpMode /*mode*/,
        bytes calldata /*context*/,
        uint256 /*actualGasCost*/,
        uint256 /*actualUserOpFeePerGas*/
    ) internal override {
        // No additional logic needed after the operation
    }

    /**
     * @notice Allow the owner to withdraw deposited funds.
     */
    function withdrawTo(address payable withdrawAddress, uint256 amount) external override onlyOwner {
        entryPoint.withdrawTo(withdrawAddress, amount);
    }
}
