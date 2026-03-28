// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

/**
 * @title DisasterReliefDAO
 * @notice OpenZeppelin Governor with custom Quadratic Voting weight calculation.
 */
contract DisasterReliefDAO is 
    Governor, 
    GovernorSettings, 
    GovernorCountingSimple, 
    GovernorVotes, 
    GovernorVotesQuorumFraction, 
    GovernorTimelockControl 
{
    uint256 public constant VOTING_THRESHOLD = 1000 * 10**18;
    uint256 public constant MAX_VOTING_WEIGHT = 1000000; // Cap for weight

    constructor(IVotes _token, TimelockController _timelock)
        Governor("DisasterReliefDAO")
        GovernorSettings(1 days, 1 weeks, 0)
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(20) // 20% quorum
        GovernorTimelockControl(_timelock)
    {}

    // The following functions are overrides required by Solidity.

    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(uint256 timepoint)
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(timepoint);
    }

    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function proposalNeedsQueuing(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.proposalNeedsQueuing(proposalId);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _executeOperations(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
    {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _queueOperations(uint256 proposalId, address[] memory targets, uint256[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
        internal
        override(Governor, GovernorTimelockControl)
        returns (uint256)
    {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    /**
     * @notice Custom voting weight logic: Quadratic Voting.
     * @dev Weight = min(sqrt(rawVotes), MAX_VOTING_WEIGHT) if rawVotes > VOTING_THRESHOLD.
     */
    function _getVotes(
        address account,
        uint256 timepoint,
        bytes memory /*params*/
    ) internal view override(Governor, GovernorVotes) returns (uint256) {
        uint256 rawVotes = super._getVotes(account, timepoint, "");
        
        if (rawVotes < VOTING_THRESHOLD) {
            return 0; // Sybil resistance: must be above threshold to vote
        }

        uint256 weight = sqrt(rawVotes / 10**18); // sqrt of whole tokens
        if (weight > MAX_VOTING_WEIGHT) {
            weight = MAX_VOTING_WEIGHT;
        }

        return weight;
    }

    /**
     * @notice Helper to calculate square root.
     */
    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}
