function getSketchesCount() {
  const fs = require("fs");
  const sketchesList = fs.readdirSync("./sketches");
  const sketchesCount = sketchesList.length - 1;

  return [sketchesCount, sketchesList];
}

const [sketchesCount, sketchesList] = getSketchesCount();

const nextConfigs = {
  // Will be available on both server and client
  publicRuntimeConfig: {
    sketchesCount,
    sketchesList,
  },

  exportPathMap: async function (defaultPathMap) {
    const myPathMap = {};
    const range = (n) => Array.from({ length: n }, (v, k) => k);
    sketchesList.map((sk) => {
      myPathMap[`/s/${sk}`] = {
        page: "p5page",
        query: {
          sketchId: sk,
        },
      };
    });
    return {
      "/": { page: "/" },
      ...myPathMap,
    };
  },
};

module.exports = nextConfigs;
