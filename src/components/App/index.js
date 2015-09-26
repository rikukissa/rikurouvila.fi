import React, { Component } from 'react';
import styles from './index.styl';
import Logo from 'components/Logo';
import Stripe from 'components/Stripe';

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Logo />
        <Stripe />
      </div>
    );
  }
}
