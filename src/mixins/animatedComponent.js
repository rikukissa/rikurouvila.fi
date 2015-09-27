import AnimationFrame from 'animation-frame';

const FRAME_RATE = 60;
const WORLD_SPEED = 1000 / 30;

export default function AnimatedComponent(component) {

  const animationFrame = new AnimationFrame(FRAME_RATE);
  let lastTime;
  let cancelled;

  const animation = {
    _loop() {
      animationFrame.request((time) => {

        if(cancelled) {
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
      cancelled = true;
    },
    componentDidMount() {
      cancelled = false;
      this._loop();
    },
    componentWillUnmount() {
      this.cancelAnimation();
    }
  };

  const animatedComponent = {...component, ...animation};
  return animatedComponent;
}
