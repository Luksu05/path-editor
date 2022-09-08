import React from "react";
import Obstacle from "./Obstacle";

const Obstacles = ({ obstacles, size }) => (
  <React.Fragment>
    {obstacles.map((obstacle) => (
      <Obstacle
        key={(Math.random() + 1).toString(36).substring(7)}
        obstacle={obstacle}
        size={size}
        color="#1F487E"
      />
    ))}
  </React.Fragment>
);

export default Obstacles;
