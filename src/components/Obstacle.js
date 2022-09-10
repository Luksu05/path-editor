import React from "react";

const Obstacle = ({ obstacle, size, color = "#829CBC" }) => (
  <polygon
    points={obstacle.map((pos) => `${pos.x * size},${pos.y * size}`).join(" ")}
    fill={color}
    
    stroke="black"
    strokeWidth="3px"
  />
);

export default Obstacle;
