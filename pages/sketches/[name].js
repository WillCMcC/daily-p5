import React, { Component } from "react";
import dynamic from "next/dynamic";
import Const from "../../utils/constants";
import { useRouter } from "next/router";

const P5Wrapper = dynamic(import("react-p5-wrapper"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const P5 = () => {
  const router = useRouter();
  const { name } = router.query;
  id_to_use = name;
  const TOTAL_SKETCHES = Const.sketchesCount;
  if (!Const.sketchesList.includes(id_to_use)) {
    return (
      <div>
        <h3>{`Invalid sketch id '${id_to_use}'`}</h3>
        <p>{`Please specify a number from 1 to ${TOTAL_SKETCHES}.`}</p>
      </div>
    );
  }
  const sketch = require(`../../sketches/${id_to_use}`).default(1000, 1000);
  return <P5Wrapper sketch={sketch} />;
};

let id_to_use;
class P5Page extends Component {
  static async getInitialProps(ctx) {
    const sketchId = ctx.query.sketchId;
    return {
      sketchId,
    };
  }

  render() {
    return (
      <div>
        <div className="container">
          <P5 />
          <div
            style={{
              display: "flex",
              gap: " 10px",
            }}
          >
            <button
              onClick={() => {
                window.p.save(`${id_to_use.replace(".js", "")}.jpg`);
              }}
              className="primary-button"
            >
              Save
            </button>
          </div>
        </div>
        <style jsx>{`
          .container {
            margin: 8px;
          }
        `}</style>
      </div>
    );
  }
}

export default P5Page;
