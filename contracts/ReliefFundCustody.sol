// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IReliefOracle {
    function proofs(bytes32 proofId) external view returns (string memory, int256, int256, uint256, bool, uint8);
}

/**
 * @title ReliefFundCustody
 * @notice Programmable fund custody with milestone-based tranche release.
 */
contract ReliefFundCustody is Ownable, ReentrancyGuard {
    enum TrancheStatus { Proposed, DAOApproved, ProofUploaded, OracleVerified, Released, Rejected }

    struct Tranche {
        uint256 amount;
        address beneficiary;
        string description;
        TrancheStatus status;
        bytes32 proofId;
        uint256 approvedAt;
        uint256 id;
    }

    IERC20 public usdc;
    address public dao;
    address public oracle;
    uint256 public constant TIMELOCK_DURATION = 48 hours;
    uint256 public constant MAX_TRANCHE_PERCENT = 30;

    Tranche[] public tranches;
    bool public isPaused;

    event TrancheProposed(uint256 indexed id, uint256 amount, address indexed beneficiary);
    event TrancheStatusUpdated(uint256 indexed id, TrancheStatus status);
    event FundsReleased(uint256 indexed id, uint256 amount, address indexed beneficiary);

    constructor(address initialOwner, address _usdc, address _dao, address _oracle) Ownable(initialOwner) {
        usdc = IERC20(_usdc);
        dao = _dao;
        oracle = _oracle;
    }

    modifier onlyDAO() {
        require(msg.sender == dao, "Custody: Only DAO can call");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Custody: Only Oracle can call");
        _;
    }

    modifier whenNotPaused() {
        require(!isPaused, "Custody: Contract is paused");
        _;
    }

    /**
     * @notice Propose a new tranche for disaster relief.
     */
    function proposeTranche(uint256 amount, address beneficiary, string calldata description) external whenNotPaused {
        uint256 totalBalance = usdc.balanceOf(address(this));
        require(amount <= (totalBalance * MAX_TRANCHE_PERCENT) / 100, "Custody: Tranche exceeds 30% limit");

        tranches.push(Tranche({
            amount: amount,
            beneficiary: beneficiary,
            description: description,
            status: TrancheStatus.Proposed,
            proofId: bytes32(0),
            approvedAt: 0,
            id: tranches.length
        }));

        emit TrancheProposed(tranches.length - 1, amount, beneficiary);
    }

    /**
     * @notice DAO approves the tranche.
     */
    function approveTranche(uint256 id) external onlyDAO whenNotPaused {
        Tranche storage t = tranches[id];
        require(t.status == TrancheStatus.Proposed, "Custody: Invalid state");
        t.status = TrancheStatus.DAOApproved;
        t.approvedAt = block.timestamp;
        emit TrancheStatusUpdated(id, TrancheStatus.DAOApproved);
    }

    /**
     * @notice NGO/Beneficiary uploads proof (link to IPFS via Oracle).
     */
    function attachProof(uint256 id, bytes32 proofId) external whenNotPaused {
        Tranche storage t = tranches[id];
        require(t.status == TrancheStatus.DAOApproved, "Custody: Not approved by DAO");
        t.proofId = proofId;
        t.status = TrancheStatus.ProofUploaded;
        emit TrancheStatusUpdated(id, TrancheStatus.ProofUploaded);
    }

    /**
     * @notice Oracle verifies the proof.
     */
    function verifyTranche(uint256 id) external onlyOracle whenNotPaused {
        Tranche storage t = tranches[id];
        require(t.status == TrancheStatus.ProofUploaded, "Custody: Proof not uploaded");
        
        // Verify from Oracle contract
        (,,,, bool isVerified,) = IReliefOracle(oracle).proofs(t.proofId);
        require(isVerified, "Custody: Proof not verified by Oracle committee");

        t.status = TrancheStatus.OracleVerified;
        emit TrancheStatusUpdated(id, TrancheStatus.OracleVerified);
    }

    /**
     * @notice Release funds after timelock.
     */
    function releaseTranche(uint256 id) external nonReentrant whenNotPaused {
        Tranche storage t = tranches[id];
        require(t.status == TrancheStatus.OracleVerified, "Custody: Not verified");
        require(block.timestamp >= t.approvedAt + TIMELOCK_DURATION, "Custody: Timelock not expired");

        t.status = TrancheStatus.Released;
        require(usdc.transfer(t.beneficiary, t.amount), "Custody: Transfer failed");

        emit FundsReleased(id, t.amount, t.beneficiary);
    }

    /**
     * @notice Emergency freeze all disbursements.
     */
    function setPaused(bool _paused) external onlyOwner {
        isPaused = _paused;
    }

    function updateDAO(address _dao) external onlyOwner {
        dao = _dao;
    }

    function updateOracle(address _oracle) external onlyOwner {
        oracle = _oracle;
    }
}
