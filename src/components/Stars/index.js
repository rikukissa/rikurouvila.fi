import React from 'react';
import styles from './index.styl';
import range from 'lodash.range';
import classNames from 'classnames';
import animatedComponent from 'mixins/animatedComponent';
import random from 'utils/random';
import sign from 'math-sign';

const BOUNCING_STARS = 25;
const SHOOTING_STARS = 50;

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
    star.vy = Math.abs(star.vy) * -3;
    star.vx *= 3;
    return star;
  }

  if(Math.abs(star.y) > 10) {
    star.y = sign(star.y) * 10;
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
    // Set all values to initial
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
  getInitialState() {
    return {
      stars: range(BOUNCING_STARS).map((i) => ({ ...createStar(i),
        x: i * -(STRIPE_WIDTH / BOUNCING_STARS),
        y: -10 + 20 * Math.random(),
        vx: random(-0.5, 0.5),
        vy: random(-8, 8),
        isFollower: true
      })),
      nextId: BOUNCING_STARS + 1
    };
  },
  shouldComponentUpdate(props, state) {
    return state.stars !== this.state.stars;
  },
  update(delta) {

    const progress = this.props.progress;
    const running = progress < 1;

    const maxStarsReached = this.state.stars.length >= SHOOTING_STARS + BOUNCING_STARS;

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
}));
