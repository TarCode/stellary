import React, { Component } from 'react';
import Wallet from './views/wallet'
import Transactions from './views/transactions'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wallet/>
        <Transactions/>
      </div>
    );
  }
}

export default App;
