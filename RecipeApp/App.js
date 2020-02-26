import React from 'react';
// import { Provider } from 'react-native-paper';
import App from './source';
import { theme } from './source/core/theme';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initalSate = {
  token: ''
}
const reducer = (state=initalSate,action) => {
  switch (action.type) {
      case 'Token':
        return {token : action.token};
      default:
        return {token : action.token};
  }
}
const store = createStore(reducer)

const Main = () => (
  <Provider theme={theme} store={store}>
    <App />
  </Provider>
);

export default Main;
