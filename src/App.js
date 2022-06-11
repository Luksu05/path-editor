import React, { useState } from "react";
import Grid from "./Grid";

const App = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const width = 50;
  const height = 50;
  const size = 10;

  const handleMouse = (event) => {
    setPos({
      x: Math.round(event.pageX / size) * size,
      y: Math.round(event.pageY / size) * size,
    });
  };

  return (
    <div>
      <svg
        viewBox="0 0 800 800"
        width="800px"
        height="800px"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={handleMouse}
      >
        <rect width="100%" height="100%" fill="gray" />
        <Grid width={width} height={height} size={size} />
        <circle cx={pos.x} cy={pos.y} r="5" fill="red" />
      </svg>
    </div>
  );
};

export default App;
