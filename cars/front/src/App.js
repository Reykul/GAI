import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RootRouter from './routes/index';
import { store } from './config/Store';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store} key="provider">
          <RootRouter />
        </Provider>
      </div>
    );
  }
}

export default App;
