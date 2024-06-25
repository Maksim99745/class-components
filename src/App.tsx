import React, { Component } from 'react';
import './App.css';
import { MainPage } from './pages/Main/MainPage';

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
