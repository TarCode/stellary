import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createWallet, updateKey } from './../actions';

import Loader from '../components/loader'

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
        <div className='container'>
          <div>
            <TextField
                fullWidth
                type="text"
                label="Public key"
                value={this.props.wallet.publicKey}
                onChange={(e) => this.updateKey({ payloadKey: e.target.value, key: 'publicKey' })}
            />
          </div>
          <br/>
          <div>
            <TextField
                fullWidth
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
        <div className='center'>
          <br/>
          <small>Your Address: </small><br/>
          <h1 className="center">
            {this.props.wallet.publicKey}
          </h1>
          <small>Balance: </small> <br/>
          <h1 className="center"> 
              {this.props.wallet.balance} XLM
          </h1>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    return (
        <div>
            {
                this.props.wallet.loading ?
                <Loader/> :
                <div>
                    <h2>Account</h2>

                    <Button fullWidth variant="outlined" color="secondary" disabled={this.props.wallet.loading} onClick={() => this.createWallet()}>
                        Create Wallet
                    </Button>
                    <br/><br/>
                    {
                        !this.state.inputWallet ?
                        <Button fullWidth variant="outlined" color="primary" onClick={() => this.inputWallet()}>
                            Already have a Wallet
                        </Button> : 
                        this.renderInputWallet()
                    }
                    <br />

                    {this.renderBalance()}
                </div>
            }
        </div>
    );
  }
}


export default connect(state => state, { createWallet, updateKey })(Account);
