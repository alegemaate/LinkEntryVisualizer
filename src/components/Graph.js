import React from "react";
import { Sigma, RelativeSize, EdgeShapes } from "react-sigma";
import ForceLink from "react-sigma/lib/ForceLink";

import "../stylesheets/graph.css";

export default function Graph({ graph }) {
  return (
    <div className="graph-view">
      <Sigma
        renderer="webgl"
        graph={graph}
        style={{ height: "100%" }}
        settings={{ drawEdges: true, clone: false }}
      >
        <RelativeSize initialSize={15} />
        <ForceLink
          adjustSizes
          background
          easing="cubicInOut"
          randomize="globally"
        />
        <EdgeShapes default="arrow" />
      </Sigma>
    </div>
  );
}
