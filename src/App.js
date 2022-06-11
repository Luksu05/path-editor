import React, { useState } from "react";
import Grid from "./Grid";

let obstacles = [];

const App = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [obstacle, setObstacle] = useState([]);
  const width = 50;
  const height = 50;
  const size = 100;

  const handleMouse = (event) => {
    setPos({
      x: Math.round(event.pageX / size) * size,
      y: Math.round(event.pageY / size) * size,
    });
  };

  const handleClick = () => {
    const [x, y] = [pos.x / size, pos.y / size];
    if (obstacle.length && x === obstacle[0].x && y === obstacle[0].y) {
      obstacles.push(obstacle);
      setObstacle([]);
    } else {
      setObstacle([...obstacle, { x, y }]);
    }
  };

  return (
    <div>
      <svg
        viewBox="0 0 800 800"
        width="800px"
        height="800px"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={handleMouse}
        onClick={handleClick}
      >
        <rect width="100%" height="100%" fill="gray" />
        <Grid width={width} height={height} size={size} />
        <polygon
          points={obstacle
            .map((pos) => `${pos.x * size},${pos.y * size}`)
            .join(" ")}
          fill="pink"
        />
        <circle cx={pos.x} cy={pos.y} r="5" fill="red" />
      </svg>
    </div>
  );
};

export default App;
