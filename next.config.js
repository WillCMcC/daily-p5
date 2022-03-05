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
  exportTrailingSlash: true,

  exportPathMap: async function (defaultPathMap) {
    const myPathMap = {};
    sketchesList.map((sk) => {
      myPathMap[`/s/${sk}`] = {
        page: "p5page",
        query: {
          sketchId: sk,
        },
      };
    });
    console.log(myPathMap);
    return {
      "/": { page: "/" },
      ...myPathMap,
    };
  },
};

module.exports = nextConfigs;
