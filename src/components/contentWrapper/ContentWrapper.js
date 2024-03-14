// Arranges the content in the center
import React from "react";

import "./style.css";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;