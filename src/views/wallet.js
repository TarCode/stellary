import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createWallet, updateKey } from './../actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      receivingAddress: '',
      inputWallet: false,
    };
  }
  createWallet() {
    this.setState({ inputWallet: false });
    this.props.createWallet();
  }
  inputWallet() {
    this.setState({ inputWallet: !this.state.inputWallet });
  }
  updateKey(payload) {
    this.props.updateKey(payload);
  }
  renderInputWallet() {
    if (this.state.inputWallet) {
      return (
        <div>
          <div>
            <TextField
                type="text"
                label="Public key"
                value={this.props.wallet.publicKey}
                onChange={(e) => this.updateKey({ payloadKey: e.target.value, key: 'publicKey' })}
            />
          </div>
          <div>
            <TextField
                type="text"
                label="Private key"
                value={this.props.wallet.privateKey}
                onChange={(e) => this.updateKey({ payloadKey: e.target.value, key: 'privateKey' })}
            />
          </div>
        </div>
      );
    }
  }

  renderBalance() {
    if (this.props.wallet.publicKey) {
      return (
        <div>
          <p className="small"> Your Address: {this.props.wallet.publicKey}</p>
          <p className="small"> Balance: {this.props.wallet.balance} XLM</p>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    return (
        <div>
            <p>Stellar Account</p>

            <Button variant="outlined" color="secondary" disabled={this.props.wallet.loading} onClick={() => this.createWallet()}>
                Create Wallet
            </Button>
            {
                !this.state.inputWallet ?
                <Button variant="outlined" color="primary" onClick={() => this.inputWallet()}>
                    Already have a Wallet
                </Button> : 
                this.renderInputWallet()
            }
            <br />

            {this.renderBalance()}
        </div>
    );
  }
}


export default connect(state => state, { createWallet, updateKey })(Account);
