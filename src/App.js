import React, { Component } from 'react'

import fundContract from './EthereumSetup.js'
import Web3 from "web3";


import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

var web3api = new Web3();

class Proposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      statement: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    
  }

  handleSubmit(event) {
      fundContract.blockfund(this.state.amount, this.state.statement).send({from: web3api.eth.accounts[0]}, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        Proposal:
        <label>
          Amount: 
          <input name="amount" type="number" onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Statement:
          <input name="statement" type="string" onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="submit"/>
      </form>
    )
  }
}

class Stage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      target: 0,
      reward: 0,
      fund_raiser: true,
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? !target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (this.state.fund_raiser && this.state.target <= fundContract.goal) {
      fundContract.add_stage(this.state.description, this.state.target, this.state.reward, this.state.fund_raiser).send({from: web3api.eth.accounts[0]}, (error, result) => {
        if (error) {
          console.log(error);
          return;
        }
      });    
    }
  }

  render () {
    return (
      <form>
        Add Stage:
        <label>
          description: 
          <input name="description" type="string" value={this.state.description} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Target:
          <input name="target" type="number" value={this.state.target} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Reward:
          <input name="reward" type="number" value={this.state.reward} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Dividend Round:
          <input name="fund_raiser" type="checkbox" value={!this.state.fund_raiser} onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="Submit" value="Submit" />
      </form>
    )
  }
}

class Invest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    }
  }

  handleChange(event) {
    this.setState({amount: event.target.value});
  }

  handleSubmit(event) {
    fundContract.invest().send({from: web3api.eth.accounts[0], gas: this.state.amount}, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  }

  render () {
    return (
      <form>
        <label>
          Invest Amount: 
          <input name="amount" type="number" value={this.state.amount} onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="Submit" value="Submit" />
      </form>
    )
  }

}

class Dividend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    }
  }

  handleChange(event) {
    this.setState({amount: event.target.value});
  }

  handleSubmit(event) {
    fundContract.dividend_checkpoint().send({from: web3api.eth.accounts[0], gas: this.state.amount}, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    });
  }

  render () {
    return (
      <form>
        <label>
          Total Dividend Amount: 
          <input name="amount" type="number" value={this.state.amount} onChange={this.handleInputChange} />
        </label>
        <br />
        <input type="Submit" value="Submit" />
      </form>
    )
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    web3api = new Web3(window.web3api.currentProvider);
  }

  fund_checkpoint() {
    this.state.contract.fund_checkpoint().send({from: this.state.web3api.accounts[0]}, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    })
  }

  dividend_checkpoint(amount) {
    this.state.contract.dividend_checkpoint().send({from: this.state.web3api.accounts[0], gas: amount}, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
    })
  }



  render() {
    return (
      <div className="App container-fluid">
        <div name="Submit Proposal">
          <Proposal />
        </div>
        <br />
        <div name="Stage">
          <Stage />
        </div>
        <br />
        <div name="Invest">
          <Invest />
        </div>
        <br />
        <div name="FundRound">
          <button onClick={App.fund_checkpoint}> Fund Next Round </button>
        </div>
        <br />
        <div name="DivRound">
          <Dividend />
        </div>
        <br />
        <div>
          Funds Raised: {fundContract.funds_raised}
        </div>
        <div>
          Last Hit Checkpoint Number: {fundContract.checkpoint_number}
        </div>
      </div>

    );
  }

}


export default App
