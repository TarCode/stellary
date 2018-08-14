import Stellar from 'stellar-sdk';
import axios from 'axios';
import {
  serverUrl,
} from '../constants/stellar';

export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';

export const CREATE_WALLET = 'CREATE_WALLET';
export const CREATE_WALLET_SUCCESS = 'CREATE_WALLET_SUCCESS';

export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';

export const UPDATE_WALLET = 'UPDATE_WALLET';

export const UPDATE_KEY = 'UPDATE_KEY';

export const CLEAR_MSG = "CLEAR_MSG"

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
    dispatch({ type: CREATE_WALLET })
    req.then((res) => {
      server.loadAccount(pair.publicKey()).then((account) => {
        dispatch({
          type: CREATE_WALLET_SUCCESS,
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
      dispatch({ type: MAKE_PAYMENT })
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
                type: MAKE_PAYMENT_SUCCESS
              });
              setTimeout(() => {
                dispatch({
                  type: CLEAR_MSG
                });
              }, 3000)
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
