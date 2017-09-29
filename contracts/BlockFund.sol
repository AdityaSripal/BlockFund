pragma solidity ^0.4.13;

contract BlockFund {
    address public recipient;

    uint public goal; //goal in wei

    Stage[] public checkpoints;

    mapping (address => uint) shares;
    Holder[] holders; //for iteration over holders 

    uint public funds_raised; //funds in wei

    uint public checkpoint_number;

    bool public valid_fund;

    bool public ended;

    string public mission;
    
    struct Stage {
        string description;
        uint target; //must reach this target for reward to be released
        uint reward;
        bool fund_raiser; // if true reward goes to recipient, otherwise reward goes to shareholders.
    }

    struct Holder {
        address holder;
        bool valid; // did not withdraw
    }

    modifier notEnded() {if (!ended) {_;}}
    modifier overflow(uint max) {_; if (msg.value > max) {
        msg.sender.transfer(msg.value - max);
        ended = true;
    }}
    modifier isRecipient() {if (msg.sender == recipient) {_;}}
    modifier reachedCheckpoint() {_; if (funds_raised > checkpoints[checkpoint_number + 1].target) {
        CheckpointReached(checkpoints[checkpoint_number + 1].description);
    }}
    modifier isFunder() {if (checkpoints[checkpoint_number+1].fund_raiser) {_;}}
    modifier isDividend() {if (!checkpoints[checkpoint_number+1].fund_raiser) {_;}}

    event NewFund(uint new_goal);
    event FundsRaised(uint amount);
    event FundsWithdrawn(uint amount);
    event CheckpointReached(string checkpoint);


    function blockfund(uint fund_goal, string statement) public {
        recipient = msg.sender;
        mission = statement;
        goal = fund_goal;
        funds_raised = 0;
        checkpoint_number = 0;
        valid_fund = false;
        ended = false;
    }

    function addStage(string description, uint target, uint reward, bool fund_raiser)
    isRecipient()
    notEnded()
    {
        checkpoints.push(Stage(description, target, reward, fund_raiser));
        if (target == goal && fund_raiser) {
            valid_fund = true;
            NewFund(goal);
        }
    }

    function invest() payable
    notEnded()
    overflow(goal)
    reachedCheckpoint()
    {
        funds_raised += msg.value;
        FundsRaised(msg.value);
        shares[msg.sender] += msg.value;
        for (uint i = 0; i < holders.length; i+=1) {
            if (holders[i].holder == msg.sender) {
                bool seen = true;
                holders[i].valid = true;
            }
        }
        if (!seen) {
            holders.push(Holder(msg.sender, true));
        }
        if (funds_raised >= goal) {
            shares[msg.sender] = shares[msg.sender] - funds_raised + goal;
            ended = true;
        }
    }

    function withdraw() payable {
        if (ended || funds_raised > checkpoints[checkpoint_number + 1].target) {
            revert();
        }
        uint amount = shares[msg.sender]; //send money still left in fund
        shares[msg.sender] = 0;
        for (uint i = 0; i < holders.length; i+=1) {
            if (holders[i].holder == msg.sender) {
                holders[i].valid = false;
            }
        }
        funds_raised -= amount;
        FundsWithdrawn(msg.value);
        msg.sender.transfer(amount);
    }

    function raise_goal(uint amount) 
    isRecipient()
    {
        ended = false;
        goal += amount;
        valid_fund = false; //must call add_stage again
    }

    function fund_checkpoint() 
    isRecipient()
    isFunder() returns (bool passed)
    {
        passed = (checkpoints[checkpoint_number + 1].target <= msg.sender.balance);
        if (passed) {
            for (uint k = checkpoint_number; k >= 0; k+=1) {
                if (checkpoints[checkpoint_number].fund_raiser) {
                    break;
                }
            }
            address cont = this;
            if (cont.balance >= checkpoints[checkpoint_number+1].reward) {
                checkpoint_number += 1;
                for (uint j = 0; j < holders.length; j += 1) {
                    shares[holders[j].holder] -= shares[msg.sender] / funds_raised * checkpoints[checkpoint_number].reward;
                }
                recipient.transfer(checkpoints[checkpoint_number].reward);
                CheckpointReached(checkpoints[checkpoint_number].description);
            } else {
                revert();
            }
        }
        return passed;
    }
    
    function dividend_checkpoint() payable
    isRecipient()
    isDividend()
    overflow(checkpoints[checkpoint_number].reward)
    {
        bool passed = (checkpoints[checkpoint_number + 1].target <= msg.sender.balance);
        uint reward = checkpoints[checkpoint_number+1].reward;
        if (msg.value < reward || !passed) {
            revert();
        }
        checkpoint_number += 1;
        for (uint i = 0; i < holders.length; i += 1) {
            if (holders[i].valid) {
                holders[i].holder.transfer(reward * shares[holders[i].holder] / funds_raised);
            }
        }
        CheckpointReached(checkpoints[checkpoint_number].description);
    }





}