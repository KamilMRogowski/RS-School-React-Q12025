import React from 'react';

export default class ErrorButton extends React.Component {
  state = { hasError: false };

  throwError = () => {
    this.setState({ hasError: true });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('Error thrown from ErrorButton component');
    }

    return <button onClick={this.throwError}>ERRORBUTTON</button>;
  }
}
