import React, { Component } from 'react';
import styles from '../MainPage.module.scss';

interface ErrorButtonState {
  throwError: boolean;
}

class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = {
      throwError: false,
    };
  }

  public handleClick = () => {
    this.setState({ throwError: true });
  };

  public render(): React.ReactNode {
    const { throwError } = this.state;
    if (throwError) {
      throw new Error('This is the test error for checking Error Boundary');
    }

    return (
      <button type="button" className={styles.errorButton} onClick={this.handleClick}>
        Error button
      </button>
    );
  }
}

export default ErrorButton;
