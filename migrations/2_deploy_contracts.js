var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var BlockFund = artifacts.require("./BlockFund.sol");

module.exports = function(deployer) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 10;
  
  deployer.deploy(SimpleStorage);
  deployer.deploy(BlockFund, 5000, "my_fund");
};
