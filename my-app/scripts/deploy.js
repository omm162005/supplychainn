const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Tracking contract...");

  // Get contract factory
  const Tracking = await ethers.getContractFactory("Tracking");

  // Deploy contract
  const tracking = await Tracking.deploy();

  // Wait for deployment
  await tracking.deployed();

  console.log("✅ Tracking deployed to:", tracking.address);
}

// Run deploy
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
