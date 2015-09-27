import React from 'react';
import styles from './index.styl';
import range from 'lodash.range';
import animatedComponent from 'mixins/animatedComponent';
import Stars from 'components/Stars';

export default React.createClass(animatedComponent({
  getInitialState() {
    return {
      progress: 0
    };
  },
  update(delta) {
    this.setState({
      progress: Math.min(1, this.state.progress + 0.01 * delta)
    });
  },
  render() {
    const style = {
      height: `${this.state.progress * 100}%`
    };

    return (
      <div className={styles.main} style={style}>
        {
          range(4).map((i) =>
            <div key={i} className={styles.stripe}></div>)
        }
        <Stars progress={this.state.progress} />
      </div>
    );
  }
}));
