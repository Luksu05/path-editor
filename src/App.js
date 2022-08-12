import React, { useState } from "react";
import Grid from "./components/Grid";
import Obstacles from "./components/Obstacles";
import Obstacle from "./components/Obstacle";
import "./App.css";

let obstacles = [];

const App = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [posOffset, setPosOffset] = useState({ x: 0, y: 0 });
  const [obstacle, setObstacle] = useState([]);
  const width = 50;
  const height = 50;
  const size = 100;
  const svg = document.getElementsByTagName("svg")[0];

  const handleMouse = (event) => {
    getCoords(svg)
    setPos({
      x: Math.round(event.pageX / size) * size - posOffset.y,
      y: Math.round(event.pageY / size) * size - posOffset.x,
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

  const getCoords = (elem) => {
    const box = elem.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top  = box.top +  scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    setPosOffset({x: Math.round(top / 100) * 100, y: Math.round(left / 100) * 100});
  }

  return (
    <div className="maindiv">
      <header>
        <h1>{width}</h1>
      </header>
      <div className="innerdiv">
        <svg
          viewBox="0 0 800 800"
          width={800}
          height={800}
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
