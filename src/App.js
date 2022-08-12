import React, { useEffect, useRef, useState } from "react";
import Grid from "./components/Grid";
import Obstacles from "./components/Obstacles";
import Obstacle from "./components/Obstacle";
import "./App.css";

let obstacles = [];

const App = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [obstacle, setObstacle] = useState([]);
  const width = 50;
  const height = 50;
  const size = 100;
  const ref = useRef(null);

  useEffect(() => {
    console.log("width", ref.current.offsetWidth);
    console.log("height", ref.current.offsetHeight);
  }, []);

  const handleMouse = (event) => {
    setPos({
      x: Math.round(event.pageX / size) * size,
      y: Math.round((event.pageY - 70) / size) * size,
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
    <div className="maindiv">
      <header>
        <h1>{width}</h1>
      </header>
      <div ref={ref} className="innerdiv">
        <svg
          viewBox="0 0 800 800"
          width={size * 8}
          height={size * 8  }
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={handleMouse}
          onClick={handleClick}
        >
          <rect width="100%" height="100%" fill="gray" />
          <Grid width={width} height={height} size={size} />
          <Obstacles obstacles={obstacles} size={size} />
          <Obstacle obstacle={obstacle} size={size} />
          <circle cx={pos.x} cy={pos.y} r="5" fill="red" />
        </svg>
      </div>
    </div>
  );
};

export default App;
