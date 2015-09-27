import React, { Component } from 'react';
import styles from './index.styl';

export default class Logo extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <img src={require('file!assets/images/riku.png')} />
          <img src={require('file!assets/images/rouvila.png')} />
        </div>
      </div>
    );
  }
}
