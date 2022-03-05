# daily-p5

A gallery website for making p5.js sketches built with Next.js. Just fork and edit how you want.

Deployed [here with Vercel](https://sketches-iu3mskte0-willcmcc.vercel.app/)

NOTE: Unlike pure p5.js where you can access draw function globally, you have to use variable `p` to draw. (E.g., `p.rect(...)`, `p.line(...)`, etc.)

### How to run

1. `npm install`
2. `npm run dev`
3. Go to `http://localhost:3000`

### Make a new sketch

1. `npm run new-sketch ${NAME}`, it automatically creates a new js file for a sketch in the format of NAME.js ...
2. Code!

### Navigation

- Go to `http://localhost:3000` to view all sketches. 
- Go to `http://localhost:3000/s/NAME` to view `NAME.js` sketch.
