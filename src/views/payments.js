import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makePayment } from '../actions';

import Dialog from '../components/dialog'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class MakePayments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0,
      receivingAddress: '',
      pay: false
    };
  }
  makePayment() {
    this.props.makePayment({
      receiver: this.state.receivingAddress,
      amount: this.state.amount,
    });
  }
  render() {
    return (
    <div>
        <Dialog
            modal_content={
                <div>
                    <h2>Make Payment</h2>
                    <br />
                    <div>
                    <TextField
                        fullWidth
                        type="text"
                        label="Address"
                        value={this.state.receivingAddress}
                        onChange={(e) => this.setState({ receivingAddress: e.target.value })}
                    />
                    </div>
                    <br/>
                    <div>
                    <TextField
                        fullWidth
                        type="number"
                        label="Amount (XLM)"
                        value={this.state.amount}
                        onChange={(e) => this.setState({ amount: e.target.value })}
                    />
                    </div>
                    <br/>
                    <Button fullWidth variant='raised' color='primary' onClick={() => this.makePayment()}>
                        Pay
                    </Button>
                </div>
            }
            is_open={this.state.pay}
            close={() => this.setState({ pay: false })}
        />
        <div>
        {
            this.props.wallet.publicKey ?
            <Button fullWidth variant='raised' color='primary' onClick={() => this.setState({ pay: true })}>
                Make Payment
            </Button> :
            null
        }
        </div>
        
    </div>
    );
  }
}


export default connect(state => state, { makePayment })(MakePayments);
