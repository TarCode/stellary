import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';
import 'typeface-roboto'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });


const store = configureStore();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
  
  , document.getElementById('root'));
  registerServiceWorker();