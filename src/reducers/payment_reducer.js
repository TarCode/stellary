import {
    FETCH_TRANSACTIONS,
    CREATE_WALLET,
    MAKE_PAYMENT,
    UPDATE_WALLET,
    UPDATE_KEY,
    CREATE_WALLET_SUCCESS,
    MAKE_PAYMENT_SUCCESS,
    CLEAR_MSG
  } from './../actions';
  
  export const transactions = (state = [], action) => {
    switch (action.type) {
      case FETCH_TRANSACTIONS:
        return [action.transactions, ...state];
      default:
        return state;
    }
  };
  
  
  const initialState = {
    publicKey: '',
    privateKey: '',
    loading: false
  };
  
  export const wallet = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_WALLET:
        return {
          loading: true
        };
      case CREATE_WALLET_SUCCESS:
        return {
          publicKey: action.public,
          privateKey: action.private,
          balance: action.balance,
          loading: false
        };
      case UPDATE_WALLET:
        return {
          ...state,
          balance: action.balance
        };
      case UPDATE_KEY:
        return {
          ...state,
          [action.key]: action.payloadKey
        };
      default:
        return state;
    }
  };
  
  export const payment = (state = { loading: false }, action) => {
    switch (action.type) {
      case MAKE_PAYMENT:
        return {
          loading: true
        };
      case CLEAR_MSG:
        return {
          ...state,
          msg: null
        };
      case MAKE_PAYMENT_SUCCESS:
        return {...state, msg: "Payment made", loading: false};
      default:
        return state;
    }
  };
  