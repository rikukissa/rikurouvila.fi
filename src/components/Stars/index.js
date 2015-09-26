import React from 'react';
import styles from './index.styl';
import range from 'lodash.range';
import classNames from 'classnames';
import animatedComponent from 'mixins/animatedComponent';

const FOLLOWER_STARS = 25;
const MAX_CONCURRENT_STARS = 75 + FOLLOWER_STARS;

const GRAVITY = 1;
const STRIPE_WIDTH = 100;
const STAR_RADIUS = 32 / 2;
const STARS_PER_TICK = 1;
const height = window.innerHeight;

function updateFollowerStar(progress, delta, star) {
  star.y += star.vy * delta;
  star.x += star.vx * delta;

  if(progress === 1) {
    star.isFollower = false;
    return star;
  }

  if(Math.abs(star.y) > 10) {
    star.y = Math.sign(star.y) * 10;
    star.vy *= -1;
  }


  if(star.x > 0 || star.x < -STRIPE_WIDTH) {
    star.vx *= -1;
  }

  return star;
}

function updateStar(progress, delta, star) {
  if(star.isFollower) {
    return updateFollowerStar(progress, delta, star);
  }

  star.x += star.vx * delta;
  star.y += star.vy * delta;
  star.vy += GRAVITY * delta;

  if(progress < 1 && !isInViewport(progress, star)) {
    return {...star, ...createStar(star.id)};
  }

  return star;
}

function isInViewport(progress, star) {
  return star.y - (STAR_RADIUS * 2) + progress * height < height &&
    (-star.x - STAR_RADIUS) < STRIPE_WIDTH;
}

function createStar(id) {
  return {
    id,
    x: -Math.random() * STRIPE_WIDTH,
    y: 0,
    vx: -2 + Math.random() * 4,
    vy: -12 + -5 * Math.random()
  };
}

export default React.createClass(animatedComponent({
  getInitialState() {
    return {
      stars: range(FOLLOWER_STARS).map((_, i) => ({ ...createStar(i),
        x: i * -(STRIPE_WIDTH / FOLLOWER_STARS),
        y: -10 + 20 * Math.random(),
        vx: -1 + Math.random() * 2,
        vy: -8 + 16 * Math.random(),
        isFollower: true
      })),
      nextId: FOLLOWER_STARS + 1
    }
  },
  shouldComponentUpdate(props, state) {
    return state.stars !== this.state.stars;
  },
  update(delta, worldTick) {

    const progress = this.props.progress;
    const running = progress < 1;

    const maxStarsReached = this.state.stars.length >= MAX_CONCURRENT_STARS;

    const canCreateStars = !maxStarsReached && running;

    const newStars = !canCreateStars ? [] : range(STARS_PER_TICK)
      .map((i) => createStar(this.state.nextId + i));

    const stars = this.state.stars
    // Create new stars
    .concat(newStars)
    .map((star) => updateStar(progress, delta, star))
    .filter((star) => isInViewport(progress, star));

    this.setState({
      stars,
      nextId: this.state.nextId + newStars.length
    });

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
            return <div key={star.id} className={styles.star} style={style}></div>;
          })
        }
      </div>
    );
  }
}))
