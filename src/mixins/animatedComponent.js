import React, { Component } from 'react';
import AnimationFrame from 'animation-frame';

const FRAME_RATE = 60;
const WORLD_SPEED = 1000 / 30;

export default function AnimatedComponent(component) {

  const animationFrame = new AnimationFrame(FRAME_RATE);
  let lastTime;


  const animation = {
    _loop() {
      animationFrame.request((time) => {
        if(this.cancelled) {
          return;
        }

        const delta = lastTime ? (time - lastTime) / WORLD_SPEED : 1;
        const worldTick = Math.floor(time / WORLD_SPEED);

        this.update(delta, worldTick);
        lastTime = time;
        this._loop();
      });
    },
    cancelAnimation() {
      this.cancelled = true;
    },
    componentDidMount() {
      this.cancelled = false;
      this._loop();
    },
    componentDidUnmount() {
      this.cancelAnimation();
    }
  };

  const animatedComponent = {...component, ...animation};
  return animatedComponent;
}
