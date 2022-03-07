import Transformer from "../utils/transformer";
import { range } from "../utils/utils";

const Sketch =
  (W, H, tiny = false) =>
  (p) => {
    if (!tiny) {
      [W, H] = [window.innerWidth, window.innerHeight];
    }
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
    const waterHeight = 0.25;
    const mountainHeight = 0.7;
    const heights = [];
    p.setup = () => {
      p.createCanvas(W, H);
      p.angleMode(RADIANS);
      p.background(0);

      for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {
          const v = p.noise(0.0001 * resolution * x, 0.0001 * resolution * y);
          const shouldBeColoredIn =
            Math.round(v * maxHeight) % heightMarker < 2;
          let white = p.color(255 * v);

          if (v < waterHeight) {
            white = p.color(v * 255 * 0.5, 0, 255);
          } else if (v > mountainHeight) {
            white = p.color(255);
          } else if (shouldBeColoredIn) {
            white = p.color(0);
          }
          p.set(x, y, white);
          heights.push({
            x,
            y,
            v,
          });
        }
      }
      p.updatePixels();

      const max = heights.reduce((item, acc) => {
        if (item?.v > acc?.v) {
          return item;
        }
        return acc;
      }, {});
      const red = p.color(255, 0, 0);
      p.fill(red);
      p.circle(max.x, max.y, 25);
      p.textSize(12);
      p.text(
        `peak at ${max.v * maxHeight}m`,
        p.constrain(max.x, 25, window.innerWidth - 100),
        p.constrain(max.y + 26, 25, window.innerHeight - 25)
      );
      const min = heights.reduce((item, acc) => {
        if (item?.v < acc?.v) {
          return item;
        }
        return acc;
      }, {});
      const blue = p.color(0, 255, 0);
      p.fill(blue);
      p.stroke(p.color(0));
      p.circle(min.x, min.y, 25);
      p.text(
        `low at ${min.v * maxHeight}m`,
        p.constrain(min.x, 25, window.innerWidth - 100),
        p.constrain(min.y + 26, 25, window.innerHeight - 25)
      );
    };

    p.draw = () => {};
  };
export default Sketch;
