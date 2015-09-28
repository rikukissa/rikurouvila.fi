import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default React.createClass({
  render() {
    const classes = classNames(
      styles.fa,
      styles[`fa-${this.props.icon}`],
      this.props.className
    );

    return (
      <i className={classes}></i>
    );
  }
});
