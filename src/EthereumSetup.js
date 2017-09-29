import Web3 from "web3";

var web3 = new Web3();

const abi = [
    {
    "constant": true,
    "inputs": [],
    "name": "ended",
    "outputs": [
        {
        "name": "",
        "type": "bool"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "mission",
    "outputs": [
        {
        "name": "",
        "type": "string"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "funds_raised",
    "outputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "valid_fund",
    "outputs": [
        {
        "name": "",
        "type": "bool"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": true,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "goal",
    "outputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
        {
        "name": "description",
        "type": "string"
        },
        {
        "name": "target",
        "type": "uint256"
        },
        {
        "name": "reward",
        "type": "uint256"
        },
        {
        "name": "fund_raiser",
        "type": "bool"
        }
    ],
    "name": "addStage",
    "outputs": [],
    "payable": false,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "recipient",
    "outputs": [
        {
        "name": "",
        "type": "address"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "checkpoint_number",
    "outputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "dividend_checkpoint",
    "outputs": [],
    "payable": true,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
        {
        "name": "fund_goal",
        "type": "uint256"
        },
        {
        "name": "statement",
        "type": "string"
        }
    ],
    "name": "blockfund",
    "outputs": [],
    "payable": false,
    "type": "function"
    },
    {
    "constant": true,
    "inputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "name": "checkpoints",
    "outputs": [
        {
        "name": "description",
        "type": "string"
        },
        {
        "name": "target",
        "type": "uint256"
        },
        {
        "name": "reward",
        "type": "uint256"
        },
        {
        "name": "fund_raiser",
        "type": "bool"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "fund_checkpoint",
    "outputs": [
        {
        "name": "passed",
        "type": "bool"
        }
    ],
    "payable": false,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [
        {
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "raise_goal",
    "outputs": [],
    "payable": false,
    "type": "function"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "invest",
    "outputs": [],
    "payable": true,
    "type": "function"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "name": "new_goal",
        "type": "uint256"
        }
    ],
    "name": "NewFund",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "FundsRaised",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
        }
    ],
    "name": "FundsWithdrawn",
    "type": "event"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "name": "checkpoint",
        "type": "string"
        }
    ],
    "name": "CheckpointReached",
    "type": "event"
    }
]

const address = '0x638ae87b1c6c692de2a62125edde2f3703069757'; // contract on Ropsten Network
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));
const blockfund = web3.eth.contract(abi);
const fundContract = blockfund.at(address);

export {fundContract, web3}