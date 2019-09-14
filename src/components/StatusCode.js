import React from "react";
import { HTTP_STATUS_CODES } from "../constants/status";

export default function StatusCode({ code = "unknown" }) {
  const codeObject =
    HTTP_STATUS_CODES[code.toString()] || HTTP_STATUS_CODES["unknown"];

  return (
    <React.Fragment>
      {`${code}: ${codeObject.message} - ${codeObject.description}`}
    </React.Fragment>
  );
}
