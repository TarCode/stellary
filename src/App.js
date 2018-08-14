import React, { Component } from 'react';
import Transactions from './views/transactions'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Transactions/>
      </div>
    );
  }
}

export default App;
