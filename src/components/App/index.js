import React, { Component } from 'react';
import styles from './index.styl';
import Logo from 'components/Logo';
import Stripe from 'components/Stripe';
import Icon from 'components/Icon';

export class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Logo />
        <Stripe />
        <div className={styles.contacts}>
          <a className={styles.link} href='https://github.com/rikukissa'>
            <Icon className={styles.icon} icon='github' />
          </a>
          <a className={styles.link} href='https://twitter.com/rikurouvila'>
            <Icon className={styles.icon} icon='twitter' />
          </a>
          <a className={styles.link} href='https://www.facebook.com/riku.rouvila'>
            <Icon className={styles.icon} icon='facebook' />
          </a>
          <a className={styles.link} href='http://www.linkedin.com/in/rikurouvila'>
            <Icon className={styles.icon} icon='linkedin' />
          </a>
        </div>
      </div>
    );
  }
}
