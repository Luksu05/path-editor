import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Obstacles from "./components/Obstacles";
import Obstacle from "./components/Obstacle";
import Point from "./components/Point";
import GetLines from "./components/GetLines";
import Path from "./components/Path";
import "./styles.css";

let obstacles = [];
let lines = [];
let path = [];
let paths = [];

const dist = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};
const sqr = (x) => {
  return x * x;
};
const dist2 = (v, w) => {
  return sqr(v.x - w.x) + sqr(v.y - w.y);
};

const App = () => {
  const [mode, setMode] = useState(0); // 0 = add obstacles, 1 = add point A, 2 = add point B.
  const [pointA, setPointA] = useState({ x: 1, y: 1 });
  const [pointB, setPointB] = useState({ x: 2, y: 2 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [obstacle, setObstacle] = useState([]);
  const [bestPath, setBestPath] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const tileSize = 50;
  const gridSize = 100;

  useEffect(() => {
    window.addEventListener("resize", setWindowHeight(window.innerHeight));
    return () =>
      window.removeEventListener("resize", setWindowHeight(window.innerHeight));
  }, []);

  const handleMouse = (event) => {
    const box = document.getElementsByTagName("svg")[0].getBoundingClientRect();

    setPos({
      x:
        Math.round((event.clientX - box.left) / gridSize / (box.width / 800)) *
        gridSize,
      y:
        Math.round((event.clientY - box.top) / gridSize / (box.height / 800)) *
        gridSize,
    });
  };

  const handleClick = () => {
    setBestPath([]);
    path = [];
    if (mode === 0) {
      const [x, y] = [pos.x / gridSize, pos.y / gridSize];
      if (obstacle.length && x === obstacle[0].x && y === obstacle[0].y) {
        obstacles.push(obstacle);
        setObstacle([]);
        lines = GetLines({ obstacles });
      } else {
        setObstacle([...obstacle, { x, y }]);
      }
    } else if (mode === 1) {
      const [x, y] = [pos.x / gridSize, pos.y / gridSize];
      setPointA({ x, y });
    } else if (mode === 2) {
      const [x, y] = [pos.x / gridSize, pos.y / gridSize];
      setPointB({ x, y });
    }
  };

  const distToSegmentSquared = (p, v, w) => {
    let l2 = dist2(v, w);
    if (l2 === 0) return dist2(p, v);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) });
  };

  const distToSegment = (p, v, w) => {
    return Math.sqrt(distToSegmentSquared(p, v, w));
  };

  const checkIntersection = (p1, p2) => {
    lines = GetLines({ obstacles });
    let intersectingLines = [];
    for (let i = 0; i < lines.length; i++) {
      const p3 = { x: lines[i].x1, y: lines[i].y1 };
      const p4 = { x: lines[i].x2, y: lines[i].y2 };

      const c2x = p3.x - p4.x;
      const c3x = p1.x - p2.x;
      const c2y = p3.y - p4.y;
      const c3y = p1.y - p2.y;

      const d = c3x * c2y - c3y * c2x;

      const u1 = p1.x * p2.y - p1.y * p2.x;
      const u4 = p3.x * p4.y - p3.y * p4.x;

      const px = (u1 * c2x - c3x * u4) / d;
      const py = (u1 * c2y - c3y * u4) / d;

      const p = { x: px, y: py };
      console.log(Math.floor((dist(p3, p) + dist(p, p4)) * 10000) / 10000);
      console.log(Math.floor(dist(p3, p4) * 10000) / 10000);
      console.log(lines.length);
      if (
        Math.floor((dist(p3, p) + dist(p, p4)) * 10000) / 10000 ===
        Math.floor(dist(p3, p4) * 10000) / 10000
      ) {
        intersectingLines.push(lines[i]);
      }
    }
    console.log(intersectingLines);
    if (intersectingLines.length) {
      let intersectingLine = intersectingLines[0];
      for (let i = 0; i < intersectingLines.length; i++) {
        if (
          distToSegment(
            { x: p1.x, y: p1.y },
            { x: intersectingLines[i].x1, y: intersectingLines[i].y1 },
            { x: intersectingLines[i].x2, y: intersectingLines[i].y2 }
          ) >
          distToSegment(
            { x: p1.x, y: p1.y },
            { x: intersectingLine.x1, y: intersectingLine.y1 },
            { x: intersectingLine.x2, y: intersectingLine.y2 }
          )
        ) {
          console.log(p1);
          console.log(
            distToSegment(
              { x: p1.x, y: p1.y },
              { x: intersectingLines[i].x1, y: intersectingLines[i].y1 },
              { x: intersectingLines[i].x2, y: intersectingLines[i].y2 }
            )
          );
          let intersectingLine = intersectingLines[i];
          console.log(intersectingLine);
        }
      }
      console.log(intersectingLine);
      return intersectingLine;
    } else {
      return false;
    }
  };

  const calculate = (pointA, pointB) => {
    let isOn = true;
    let currentPoint = pointA;
    let intersectingLine = checkIntersection(currentPoint, pointB);
    path.push([pointA.x, pointA.y]);

    while (isOn) {
      if (!intersectingLine) {
        path.push([pointB.x, pointB.y]);
        setBestPath(path);
        paths.push(path);
        path = [];
        isOn = false;
      } else {
        intersectingLine = checkIntersection(currentPoint, pointB);
        isOn = false;
      }
    }
  };

  return (
    <div className="maindiv">
      <header className="container">
        <button onClick={() => setMode(0)}>
          <h2>Make obstacles</h2>
        </button>
        <button onClick={() => setMode(1)}>
          <h2>Add point A</h2>
        </button>
        <button onClick={() => setMode(2)}>
          <h2>Add point B</h2>
        </button>
        <button onClick={() => calculate(pointA, pointB)}>
          <h2>Calculate</h2>
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
          <Grid width={tileSize} height={tileSize} size={gridSize} />
          <Obstacles obstacles={obstacles} size={gridSize} />
          <Obstacle obstacle={obstacle} size={gridSize} />
          <Point
            pointX={pointA.x}
            pointY={pointA.y}
            size={gridSize}
            color="green"
          />
          <Point
            pointX={pointB.x}
            pointY={pointB.y}
            size={gridSize}
            color="yellow"
          />
          <Path bestPath={bestPath} />
          <circle cx={pos.x} cy={pos.y} r="5" fill="red" />
        </svg>
      </div>
    </div>
  );
};

export default App;
