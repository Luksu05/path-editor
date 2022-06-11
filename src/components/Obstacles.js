import React from "react";
import Obstacle from "./Obstacle";

const Obstacles = ({ obstacles, size }) => (
  <React.Fragment>
    {obstacles.map((obstacle) => (
      <Obstacle obstacle={obstacle} size={size} color="red" />
    ))}
  </React.Fragment>
);

export default Obstacles;
