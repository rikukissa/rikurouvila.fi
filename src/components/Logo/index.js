import React, { Component } from 'react';
import styles from './index.styl';
import CSSModules from 'react-css-modules';
class Logo extends Component {
  render() {
    return (
      <div styleName='main'>
        <div styleName='container'>
          <img src={require('url!assets/images/riku.png')} />
          <img src={require('url!assets/images/rouvila.png')} />
        </div>
      </div>
    );
  }
}

export default CSSModules(Logo, styles);
