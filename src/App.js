import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Obstacles from "./components/Obstacles";
import Obstacle from "./components/Obstacle";
import Point from "./components/Point";
import "./styles.css";

let obstacles = [];
let lines = [];
let paths = [];

const distance = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const App = () => {
  const [mode, setMode] = useState(0); // 0 = add obstacles, 1 = add point A, 2 = add point B.
  const [pointA, setPointA] = useState({ x: 1, y: 1 });
  const [pointB, setPointB] = useState({ x: 2, y: 2 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [posOffset, setPosOffset] = useState({ x: 0, y: 0 });
  const [obstacle, setObstacle] = useState([]);
  const [path, setPath] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const width = 50;
  const height = 50;
  const size = 100;

  useEffect(() => {
    window.addEventListener("resize", updateDimensions());
    return () => window.removeEventListener("resize", updateDimensions());
  }, []);

  const updateDimensions = () => {
    setWindowHeight(window.innerHeight);
  };

  const handleMouse = (event) => {
    getCoords();
    setPos({
      x: Math.round(event.pageX / size) * size - posOffset.y,
      y: Math.round(event.pageY / size) * size - posOffset.x,
    });
  };

  const handleClick = () => {
    if (mode === 0) {
      const [x, y] = [pos.x / size, pos.y / size];
      if (obstacle.length && x === obstacle[0].x && y === obstacle[0].y) {
        obstacles.push(obstacle);
        setObstacle([]);
      } else {
        setObstacle([...obstacle, { x, y }]);
      }
    } else if (mode === 1) {
      const [x, y] = [pos.x / size, pos.y / size];
      setPointA({ x, y });
    } else if (mode === 2) {
      const [x, y] = [pos.x / size, pos.y / size];
      setPointB({ x, y });
    }
  };

  const getCoords = () => {
    const box = document.getElementsByTagName("svg")[0].getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    setPosOffset({
      x: Math.round(top / 100) * 100,
      y: Math.round(left / 100) * 100,
    });
  };

  const checkIntersection = (p1, p2) => {
    getLines();

    for (let i = 0; i < lines.length; i++) {
      const p3 = { x: lines[i].x1, y: lines[i].y1 };
      const p4 = { x: lines[i].x2, y: lines[i].y2 };

      const c2x = p3.x - p4.x;
      const c3x = p1.x - p2.x;
      const c2y = p3.y - p4.y;
      const c3y = p1.y - p2.y;

      const d = c3x * c2y - c3y * c2x;

      if (d === 0) {
        console.log("Error: intersection point is infinity or zero.");
      }

      const u1 = p1.x * p2.y - p1.y * p2.x;
      const u4 = p3.x * p4.y - p3.y * p4.x;

      const px = (u1 * c2x - c3x * u4) / d;
      const py = (u1 * c2y - c3y * u4) / d;

      const p = { x: px, y: py };
      if (distance(p1, p) + distance(p, p2) === distance(p1, p2)) {
        console.log("Intersects");
        return true;
      } else {
        console.log("Does not intersect");
        return false;
      }
    }
  };

  const getLines = () => {
    lines = [];
    for (let i = 0; i < obstacles.length; i++) {
      for (let j = 0; j < obstacles[i].length; j++) {
        if (obstacles[i][j + 1]) {
          lines.push({
            x1: obstacles[i][j].x,
            y1: obstacles[i][j].y,
            x2: obstacles[i][j + 1].x,
            y2: obstacles[i][j + 1].y,
          });
        } else {
          lines.push({
            x1: obstacles[i][j].x,
            y1: obstacles[i][j].y,
            x2: obstacles[i][0].x,
            y2: obstacles[i][0].y,
          });
        }
      }
      console.log(lines);
    }
  };

  const calculate = (pointA, pointB) => {
    let isOn = true;
    let currentPoint = pointA;
    setPath([{ pointA }]);
    getLines();

    while (isOn) {
      if (!checkIntersection(currentPoint, pointB)) {
        setPath((oldPath) => [...oldPath, { pointB }]);
        paths.push(path);
        isOn = false;
      }
      isOn = false;
    }
  };

  return (
    <div className="maindiv">
      <header className="container">
        <button onClick={() => setMode(0)}>
          <h1>Make obstacles</h1>
        </button>
        <button onClick={() => setMode(1)}>
          <h1>Add point A</h1>
        </button>
        <button onClick={() => setMode(2)}>
          <h1>Add point B</h1>
        </button>
        <button onClick={() => calculate(pointA, pointB)}>
          <h1>Calculate</h1>
        </button>
      </header>
      <div className="innerdiv">
        <svg
          viewBox="0 0 800 800"
          height={windowHeight * 0.8}
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={handleMouse}
          onClick={handleClick}
        >
          <rect width="100%" height="100%" fill="gray" />
          <Grid width={width} height={height} size={size} />
          <Obstacles obstacles={obstacles} size={size} />
          <Obstacle obstacle={obstacle} size={size} />
          <Point
            pointX={pointA.x}
            pointY={pointA.y}
            size={size}
            color="green"
          />
          <Point
            pointX={pointB.x}
            pointY={pointB.y}
            size={size}
            color="yellow"
          />
          <circle cx={pos.x} cy={pos.y} r="5" fill="red" />
        </svg>
      </div>
    </div>
  );
};

export default App;
