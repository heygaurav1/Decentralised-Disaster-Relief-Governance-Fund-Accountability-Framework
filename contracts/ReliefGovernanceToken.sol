// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ReliefGovernanceToken (RGT)
 * @notice Soul-bound governance token with inactivity decay for Sahayog.
 * @dev Implements ERC20Votes for governance and custom soul-binding/decay logic.
 */
contract ReliefGovernanceToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    uint256 public constant SOUL_BOUND_THRESHOLD = 100 * 10**18;
    uint256 public constant DECAY_PERIOD = 30 days;
    uint256 public constant GRACE_PERIOD = 180 days;
    uint256 public constant DECAY_PERCENTAGE = 10; // 10%

    mapping(address => uint256) public lastActivity;
    mapping(address => bool) public isWhitelisted;

    event ActivityUpdated(address indexed user, uint256 timestamp);
    event WhitelistUpdated(address indexed user, bool status);

    constructor(address initialOwner)
        ERC20("ReliefGovernanceToken", "RGT")
        ERC20Permit("ReliefGovernanceToken")
        Ownable(initialOwner)
    {}

    /**
     * @notice Mint tokens to a verified participant.
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        lastActivity[to] = block.timestamp;
    }

    /**
     * @notice Update activity timestamp to prevent decay.
     */
    function updateActivity() external {
        lastActivity[msg.sender] = block.timestamp;
        emit ActivityUpdated(msg.sender, block.timestamp);
    }

    /**
     * @notice Set whitelist status for contracts (e.g., DAO, Custody) to allow transfers.
     */
    function setWhitelist(address account, bool status) external onlyOwner {
        isWhitelisted[account] = status;
        emit WhitelistUpdated(account, status);
    }

    /**
     * @notice Soul-binding logic: Tokens below threshold are non-transferable.
     * @dev Also updates activity on transfer.
     */
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) {
        if (from != address(0) && to != address(0)) {
            require(
                balanceOf(from) >= SOUL_BOUND_THRESHOLD || isWhitelisted[from] || isWhitelisted[to],
                "RGT: Tokens are soul-bound below threshold"
            );
        }
        
        super._update(from, to, value);

        if (to != address(0)) {
            lastActivity[to] = block.timestamp;
        }
        if (from != address(0)) {
            lastActivity[from] = block.timestamp;
        }
    }

    /**
     * @notice Calculate effective voting weight with inactivity decay.
     * @dev This is a view function for the DAO to use.
     */
    function getPastVotes(address account, uint256 timepoint) public view override returns (uint256) {
        uint256 rawVotes = super.getPastVotes(account, timepoint);
        uint256 lastAct = lastActivity[account];
        
        if (block.timestamp <= lastAct + GRACE_PERIOD) {
            return rawVotes;
        }

        uint256 monthsInactive = (block.timestamp - (lastAct + GRACE_PERIOD)) / DECAY_PERIOD;
        if (monthsInactive == 0) return rawVotes;

        // Apply 10% decay per month
        uint256 decayFactor = 100;
        for (uint256 i = 0; i < monthsInactive; i++) {
            decayFactor = (decayFactor * (100 - DECAY_PERCENTAGE)) / 100;
            if (decayFactor == 0) break;
        }

        return (rawVotes * decayFactor) / 100;
    }

    // Required overrides
    function nonces(address owner) public view override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
}
