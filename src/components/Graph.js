import React from "react";
import { Sigma, ForceAtlas2, RelativeSize, NodeShapes } from "react-sigma";

import "../stylesheets/graph.css";

export default function Graph({ graph }) {
  return (
    <div className="graph-view">
      <Sigma
        renderer="canvas"
        graph={graph}
        style={{ height: "100%" }}
        settings={{
          clone: false,
          minArrowSize: 5,
          batchEdgesDrawing: true,
        }}
      >
        <RelativeSize initialSize={1} />
        <ForceAtlas2 worker />
        <NodeShapes default="image" />
      </Sigma>
    </div>
  );
}
