import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/table'
import { fetchTransactions } from '../actions';

class Payments extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }
  renderTransactions() {
    return <Table data={this.props.transactions}/>
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <h2>Transactions</h2>
        {this.renderTransactions()}
      </div>
    );
  }
}

export default connect((state) => (state), { fetchTransactions })(Payments);
