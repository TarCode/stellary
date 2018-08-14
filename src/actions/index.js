import Stellar from 'stellar-sdk';
import axios from 'axios';
import {
  serverUrl,
} from '../constants/stellar';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const CREATE_WALLET = 'CREATE_WALLET';
export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const UPDATE_WALLET = 'UPDATE_WALLET';
export const UPDATE_KEY = 'UPDATE_KEY';

const server = new Stellar.Server(serverUrl);
Stellar.Network.useTestNetwork();

export const fetchTransactions = () => (
  (dispatch) => {
    server.payments()
      .cursor('now')
      .stream({
        onmessage: (message) => {
          console.log(message);
              dispatch({
                type: FETCH_TRANSACTIONS,
                transactions: message
              });
        }
    });
  }
);

export const createWallet = () => {
  const pair = Stellar.Keypair.random();
  return (dispatch) => {
    const req = axios.get('https://horizon-testnet.stellar.org/friendbot', {
        params: {
          addr: pair.publicKey()
        }
    });
    req.then((res) => {
      server.loadAccount(pair.publicKey()).then((account) => {
        dispatch({
          type: CREATE_WALLET,
          private: pair.secret(),
          public: pair.publicKey(),
          balance: account.balances[0].balance
        });
      });
    });
  };
};

export const makePayment = ({ receiver, amount }) => (
  (dispatch, getState) => {
      const privateKey = getState().wallet.privateKey;
      const sourceKeypair = Stellar.Keypair.fromSecret(privateKey);
      const publicKey = getState().wallet.publicKey;

      server.loadAccount(publicKey)
        .then((account) => {
          const transaction = new Stellar.TransactionBuilder(account)
            .addOperation(Stellar.Operation.payment({
              destination: receiver,
              asset: Stellar.Asset.native(),
              amount
            }))
            .build();
            transaction.sign(sourceKeypair);
            console.log(transaction.toEnvelope().toXDR('base64'));
            server.submitTransaction(transaction)
              .then((transactionResult) => {
              })
              .catch((err) => {
                console.log('An error has occured:');
                console.log(err);
              });
              dispatch({
                type: MAKE_PAYMENT
              });
        })
        .then(() => {
          server.loadAccount(publicKey).then((account) => {
            dispatch({
              type: UPDATE_WALLET,
              balance: account.balances[0].balance
            });
          });
        });
  }
);

export const updateKey = ({ payloadKey, key }) => ({
  type: UPDATE_KEY,
  key,
  payloadKey
});
