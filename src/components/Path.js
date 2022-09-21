import React from "react";

const Path = ({ bestPath }) => (
  <polyline
    points={bestPath.map((p) => `${p[0] * 100},${p[1] * 100}`).join(" ")}
    fill="none"
    stroke="#7D82B8"
    strokeWidth="5px"
  />
);

export default Path;
