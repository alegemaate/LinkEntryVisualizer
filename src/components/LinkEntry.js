import React, { useState } from "react";
import "../stylesheets/link-entry.css";

import { fileTextO } from "react-icons-kit/fa/fileTextO";
import { fileCodeO } from "react-icons-kit/fa/fileCodeO";

import { timesCircle } from "react-icons-kit/fa/timesCircle";
import { checkCircle } from "react-icons-kit/fa/checkCircle";
import { arrowDown } from "react-icons-kit/fa/arrowDown";
import { link } from "react-icons-kit/fa/link";
import { externalLink } from "react-icons-kit/fa/externalLink";

import LinkSection from "./LinkSection";
import StatusCode from "./StatusCode";
import OpenButton from "./OpenButton";

export default function LinkEntry({
  url = "",
  internal = [],
  external = [],
  depth = 0,
  status = 0,
  content_type = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="link-entry" onClick={() => setOpen(!open)}>
      <OpenButton open={open} />

      {!open && (
        <React.Fragment>
          <LinkSection icon={fileTextO} text={"URL - " + url} />
        </React.Fragment>
      )}

      {open && (
        <React.Fragment>
          {/* URL */}
          <LinkSection icon={fileTextO} text="URL">
            {url}
          </LinkSection>

          {/* Status */}
          <LinkSection
            icon={status === 200 ? checkCircle : timesCircle}
            iconColor={status === 200 ? "#0A0" : "#A00"}
            text="Status"
          >
            <StatusCode code={status} />
          </LinkSection>

          {/* Content type */}
          <LinkSection icon={fileCodeO} iconColor="#DA0" text="Content Type">
            {content_type}
          </LinkSection>

          {/* Depth */}
          <LinkSection icon={arrowDown} iconColor="#009" text="Depth">
            {depth}
          </LinkSection>

          {/* Internal Links */}
          <LinkSection icon={link} iconColor="#363" text="Internal Links">
            <ul className="link-list">
              {internal.map((link, index) => (
                <li key={`${url}${index}`}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </LinkSection>

          {/* External Links */}
          <LinkSection
            icon={externalLink}
            iconColor="#633"
            text="External Links"
          >
            <ul className="link-list">
              {external.map((link, index) => (
                <li key={`${url}${index}`}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </LinkSection>
        </React.Fragment>
      )}
    </div>
  );
}
