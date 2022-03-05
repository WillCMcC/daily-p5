import Transformer from "../utils/transformer";
import { range } from "../utils/utils";

const Sketch = (W, H) => (p) => {
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
  const maxHeight = 1000000;
  const heightMarker = 50;
  const tf = new (Transformer(p))();

  p.setup = () => {
    p.createCanvas(W, H);
    p.angleMode(RADIANS);
    p.background(0);
    let white = p.color(255);

    for (let x = 0; x < W; x++) {
      for (let y = 0; y < H; y++) {
        const noise = p.noise(0.01 * x, 0.01 * y);

        var c = 255 * noise;

        p.set(x, y, c);
      }
    }
    p.updatePixels();
  };

  p.draw = () => {};
};
export default Sketch;
