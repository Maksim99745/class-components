import MainPage from '@pages/Main/MainPage';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  public render(): React.ReactNode {
    return (
      <div className="App">
        <MainPage />
      </div>
    );
  }
}

export default App;
