import React, { Component } from "react";
import dynamic from "next/dynamic";
import Const from "../utils/constants";

const P5Wrapper = dynamic(import("react-p5-wrapper"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
let id_to_use;
class P5Page extends Component {
  static async getInitialProps(ctx) {
    const sketchId = ctx.query.sketchId;
    return {
      sketchId,
    };
  }

  renderP5 = (id) => {
    id_to_use = id;
    const TOTAL_SKETCHES = Const.sketchesCount;
    if (!Const.sketchesList.includes(id)) {
      return (
        <div>
          <h3>{`Invalid sketch id '${id}'`}</h3>
          <p>{`Please specify a number from 1 to ${TOTAL_SKETCHES}.`}</p>
        </div>
      );
    }
    const sketch = require(`../sketches/${id}`).default(600, 600);
    return <P5Wrapper sketch={sketch} />;
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.renderP5(this.props.sketchId)}
          <button
            onClick={() => {
              window.p.save(`${id_to_use.replace(".js", "")}.jpg`);
            }}
            class="primary-button"
          >
            Save
          </button>
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
