import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import CSSModules from 'react-css-modules';

const Icon = React.createClass({
  render() {
    const classes = classNames(
      styles[`fa-${this.props.icon}`],
      this.props.className
    );

    return (
      <i styleName='fa' className={classes}></i>
    );
  }
});

export default CSSModules(Icon, styles);
