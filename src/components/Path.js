import React from "react";

const Path = ({ bestPath }) => (
  <polyline
    points={bestPath.map((p) => `${p[0] * 100},${p[1] * 100}`).join(" ")}
    stroke="white"
    strokeWidth="5px"
  />
);

export default Path;
