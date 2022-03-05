import Transformer from "../utils/transformer";
import { range } from "../utils/utils";

const Sketch = (W, H) => (p) => {
  window.p = p;
  let {
    // Constants
    RADIANS,
    PI,
    HALF_PI: PI_2,
    QUARTER_PI: PI_4,
    TWO_PI,

    // Time
    // Not sure why when millis() is used it errors out on _millisStart.
    // A workaround is just to use p.millis()
    year,
    month,
    day,
    hour,
    minute,
    second,
    set,
  } = p;
  const maxHeight = 1000;
  const heightMarker = 50;
  const tf = new (Transformer(p))();
  const resolution = Math.random() * 26;
  p.setup = () => {
    p.createCanvas(W, H);
    p.angleMode(RADIANS);
    p.background(0);
    let white = p.color(255);
    for (let x = 0; x < W; x++) {
      for (let y = 0; y < H; y++) {
        const v = p.noise(0.0001 * resolution * x, 0.0001 * resolution * y);
        const shouldBeColoredIn =
          Math.round(v * maxHeight) % heightMarker === 0;
        if (shouldBeColoredIn) {
          let white = p.color((x / W) * 255, (y / H) * 255, v * 255);
          p.set(x, y, white);
        }
      }
    }
    p.updatePixels();
  };

  p.draw = () => {};
};
export default Sketch;
