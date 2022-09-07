import React from "react";

const Obstacle = ({ obstacle, size, color = "pink" }) => (
  <polygon
    points={obstacle.map((pos) => `${pos.x * size},${pos.y * size}`).join(" ")}
    fill={color}
    stroke="black"
    strokeWidth="4px"
  />
);

export default Obstacle;
