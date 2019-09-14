import React from "react";

import { withBaseIcon } from "react-icons-kit";

import { arrowDown } from "react-icons-kit/fa/arrowDown";
import { arrowUp } from "react-icons-kit/fa/arrowUp";

const OpenIcon = withBaseIcon({
  size: 16,
  style: { color: "#333", position: "absolute", top: "10px", right: "10px" }
});

export default function OpenButton({ open = false }) {
  return (
    <React.Fragment>
      {open ? <OpenIcon icon={arrowDown} /> : <OpenIcon icon={arrowUp} />}
    </React.Fragment>
  );
}
