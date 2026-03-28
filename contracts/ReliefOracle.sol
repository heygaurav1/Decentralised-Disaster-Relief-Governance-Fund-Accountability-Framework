// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title ReliefOracle
 * @notice M-of-N committee oracle for geo-tag validation and IPFS proof verification.
 */
contract ReliefOracle is Ownable {
    using ECDSA for bytes32;

    struct ProofRecord {
        string ipfsCid;
        int256 latitude;
        int256 longitude;
        uint256 timestamp;
        bool isVerified;
        uint8 voteCount;
        mapping(address => bool) hasVoted;
    }

    uint256 public constant MIN_VOTES = 3;
    mapping(address => bool) public isCommitteeMember;
    mapping(bytes32 => ProofRecord) public proofs;
    bytes32[] public proofIds;

    // Geographic bounding boxes (Scale: 1e6 for decimal precision)
    // Assam: 24.3N-28.2N, 89.4E-96.1E
    // WB: 21.5N-27.2N, 85.8E-89.8E
    
    event ProofSubmitted(bytes32 indexed proofId, string ipfsCid, int256 lat, int256 lon);
    event ProofVerified(bytes32 indexed proofId, bool status);
    event CommitteeMemberUpdated(address indexed member, bool status);

    constructor(address initialOwner, address[] memory committee) Ownable(initialOwner) {
        for (uint256 i = 0; i < committee.length; i++) {
            isCommitteeMember[committee[i]] = true;
            emit CommitteeMemberUpdated(committee[i], true);
        }
    }

    /**
     * @notice Submit evidence for verification.
     * @param ipfsCid IPFS CID of the evidence (e.g., photos, reports).
     * @param lat Latitude (multiplied by 1e6).
     * @param lon Longitude (multiplied by 1e6).
     */
    function submitProof(string calldata ipfsCid, int256 lat, int256 lon) external {
        bytes32 proofId = keccak256(abi.encodePacked(ipfsCid, lat, lon, block.timestamp));
        ProofRecord storage record = proofs[proofId];
        record.ipfsCid = ipfsCid;
        record.latitude = lat;
        record.longitude = lon;
        record.timestamp = block.timestamp;
        
        proofIds.push(proofId);
        emit ProofSubmitted(proofId, ipfsCid, lat, lon);
    }

    /**
     * @notice Vote to verify or flag a proof.
     */
    function voteOnProof(bytes32 proofId) external {
        require(isCommitteeMember[msg.sender], "Oracle: Not a committee member");
        ProofRecord storage record = proofs[proofId];
        require(!record.isVerified, "Oracle: Already verified");
        require(!record.hasVoted[msg.sender], "Oracle: Already voted");

        record.hasVoted[msg.sender] = true;
        record.voteCount++;

        if (record.voteCount >= MIN_VOTES) {
            // Geographic validation
            require(isValidLocation(record.latitude, record.longitude), "Oracle: Outside designated relief zone");
            record.isVerified = true;
            emit ProofVerified(proofId, true);
        }
    }

    /**
     * @notice Validation logic for Assam and West Bengal bounding boxes.
     */
    function isValidLocation(int256 lat, int256 lon) public pure returns (bool) {
        // Assam: 24.3 - 28.2 N, 89.4 - 96.1 E
        bool inAssam = (lat >= 24300000 && lat <= 28200000) && (lon >= 89400000 && lon <= 96100000);
        
        // WB: 21.5 - 27.2 N, 85.8 - 89.8 E
        bool inWB = (lat >= 21500000 && lat <= 27200000) && (lon >= 85800000 && lon <= 89800000);
        
        return inAssam || inWB;
    }

    function updateCommittee(address member, bool status) external onlyOwner {
        isCommitteeMember[member] = status;
        emit CommitteeMemberUpdated(member, status);
    }
}
