import React from "react";
import "../stylesheets/link-section.css";

import { withBaseIcon } from "react-icons-kit";

const SideIconContainer = withBaseIcon({
  size: 18
});

export default function LinkSection({
  icon,
  iconColor = "#333",
  text = "",
  children = null
}) {
  return (
    <div className="link-section">
      <div className="link-section-header">
        <SideIconContainer
          className="link-section-icon"
          style={{ color: iconColor }}
          icon={icon}
        />
        <p className="link-section-text">{text}</p>
      </div>
      {children && <div className="link-section-body">{children}</div>}
    </div>
  );
}
