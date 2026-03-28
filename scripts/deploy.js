const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // 1. Deploy RGT
  const ReliefGovernanceToken = await hre.ethers.getContractFactory("ReliefGovernanceToken");
  const rgt = await ReliefGovernanceToken.deploy(deployer.address);
  await rgt.deployed();
  console.log("ReliefGovernanceToken deployed to:", rgt.address);

  // 2. Deploy Timelock (48h min delay)
  const Timelock = await hre.ethers.getContractFactory("TimelockController");
  const timelock = await Timelock.deploy(172800, [], [], deployer.address);
  await timelock.deployed();
  console.log("TimelockController deployed to:", timelock.address);

  // 3. Deploy DAO
  const DisasterReliefDAO = await hre.ethers.getContractFactory("DisasterReliefDAO");
  const dao = await DisasterReliefDAO.deploy(rgt.address, timelock.address);
  await dao.deployed();
  console.log("DisasterReliefDAO deployed to:", dao.address);

  // 4. Deploy Oracle (3-of-5)
  const committee = [
    process.env.COMMITTEE_1 || deployer.address,
    process.env.COMMITTEE_2 || hre.ethers.Wallet.createRandom().address,
    process.env.COMMITTEE_3 || hre.ethers.Wallet.createRandom().address,
    process.env.COMMITTEE_4 || hre.ethers.Wallet.createRandom().address,
    process.env.COMMITTEE_5 || hre.ethers.Wallet.createRandom().address,
  ];
  const ReliefOracle = await hre.ethers.getContractFactory("ReliefOracle");
  const oracle = await ReliefOracle.deploy(deployer.address, committee);
  await oracle.deployed();
  console.log("ReliefOracle deployed to:", oracle.address);

  // 5. Deploy Custody
  const ReliefFundCustody = await hre.ethers.getContractFactory("ReliefFundCustody");
  const usdcAddress = process.env.USDC_ADDRESS || "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035";
  const custody = await ReliefFundCustody.deploy(deployer.address, usdcAddress, timelock.address, oracle.address);
  await custody.deployed();
  console.log("ReliefFundCustody deployed to:", custody.address);

  // 6. Deploy Paymaster
  const entryPoint = process.env.ENTRY_POINT || "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
  const ReliefPaymaster = await hre.ethers.getContractFactory("ReliefPaymaster");
  const paymaster = await ReliefPaymaster.deploy(entryPoint, deployer.address, deployer.address);
  await paymaster.deployed();
  console.log("ReliefPaymaster deployed to:", paymaster.address);

  // Post-deployment setup
  console.log("Setting up roles...");
  const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
  const EXECUTOR_ROLE = await timelock.EXECUTOR_ROLE();
  await timelock.grantRole(PROPOSER_ROLE, dao.address);
  await timelock.grantRole(EXECUTOR_ROLE, hre.ethers.constants.AddressZero); // Open executor
  
  await rgt.setWhitelist(custody.address, true);
  await paymaster.setSponsoredContract(custody.address, true);

  console.log("Deployment complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
