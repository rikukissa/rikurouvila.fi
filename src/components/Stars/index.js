import React from 'react';
import styles from './index.styl';
import range from 'lodash.range';
import classNames from 'classnames';
import animatedComponent from 'mixins/animatedComponent';

const FOLLOWER_STARS = 20;
const MAX_CONCURRENT_STARS = FOLLOWER_STARS + 50;

const GRAVITY = 0.4;
const STRIPE_WIDTH = 100;
const STAR_RADIUS = 32 / 2;
const height = window.innerHeight;

function updateFollowerStar(delta, star) {
  star.y += star.vy * delta;

  if(Math.abs(star.y) > 10) {
    star.y = Math.sign(star.y) * 10;
    star.vy *= -1;
  }

  return star;
}

function updateStar(delta, star) {
  if(star.isFollower) {
    return updateFollowerStar(delta, star);
  }

  star.x += star.vx * delta;
  star.y += star.vy * delta;
  star.vy += GRAVITY * delta;
  return star;
}

function isInViewport(progress, star) {
  return star.y + STAR_RADIUS + progress * height < height && (-star.x - STAR_RADIUS) < STRIPE_WIDTH;
}

export default React.createClass(animatedComponent({
  getInitialState() {
    return {
      stars: range(FOLLOWER_STARS).map((_, i) => ({
        x: i * -(STRIPE_WIDTH / FOLLOWER_STARS),
        y: -10 + 20 * Math.random(),
        vy: -8 + 16 * Math.random(),
        isFollower: true
      }))
    }
  },
  shouldComponentUpdate(props, state) {
    return state.stars !== this.state.stars;
  },
  update(delta, worldTick) {

    const running = this.props.progress < 1;
    const maxReached = this.state.stars.length === MAX_CONCURRENT_STARS;

    const canCreateStars = !maxReached && running;


    const newStars = canCreateStars ? 1 : 0;

    const stars = this.state.stars
    // Create new stars
    .concat(range(newStars).map(() => {
      return {
        x: -Math.random() * STRIPE_WIDTH,
        y: 0,
        vx: -2 + Math.random() * 4,
        vy: -7 + -5 * Math.random()
      };
    }))
    .filter((star) => isInViewport(this.props.progress, star))
    // Update all stars
    .map((star) => updateStar(delta, star));

    this.setState({stars});

    if(!running && stars.length === 0) {
      this.cancelAnimation();
    }
  },
  render() {
    return (
      <div className={classNames(styles.main, this.props.className)}>
        {
          this.state.stars.map((star) => {
            const style = {
              bottom: -star.y,
              left: -star.x
            };
            return <div className={styles.star} style={style}></div>;
          })
        }
      </div>
    );
  }
}))
