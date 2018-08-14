import React, { Component } from 'react';

import Wallet from './views/wallet'
import Transactions from './views/transactions'
import Payments from './views/payments'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Stellary</h1>
        <p>UI for interacting with the Stellar blockchain (Testnet)</p>
        <Wallet/>
        <Payments/>
        <Transactions/>
      </div>
    );
  }
}

export default App;
