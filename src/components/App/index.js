import React, { Component } from 'react';
import styles from './index.styl';
import Logo from 'components/Logo';
import Stripe from 'components/Stripe';
import Icon from 'components/Icon';

import CSSModules from 'react-css-modules';

class App extends Component {
  render() {
    return (
      <div styleName='app'>
        <Logo />
        <Stripe />
        <div styleName='contacts'>
          <a styleName='link' href='https://github.com/rikukissa'>
            <Icon styleName='icon' icon='github' />
          </a>
          <a styleName='link' href='https://twitter.com/rikurouvila'>
            <Icon styleName='icon' icon='twitter' />
          </a>
          <a styleName='link' href='https://www.facebook.com/riku.rouvila'>
            <Icon styleName='icon' icon='facebook' />
          </a>
          <a styleName='link' href='http://www.linkedin.com/in/rikurouvila'>
            <Icon styleName='icon' icon='linkedin' />
          </a>
        </div>
      </div>
    );
  }
}

export default CSSModules(App, styles);
