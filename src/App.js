import React, { useEffect, useState } from "react";
import Grid from "./components/Grid";
import Obstacles from "./components/Obstacles";
import Obstacle from "./components/Obstacle";
import Point from "./components/Point";
import GetLines from "./components/GetLines";
import Path from "./components/Path";
import GetPoints from "./components/GetPoints";
import GetGraph from "./components/GetGraph";
import Algorithm from "./components/Algorithm";
import "./styles.css";

let obstacles = [];
let lines = [];

const App = () => {
  const [mode, setMode] = useState(0); // 0 = add obstacles, 1 = add point A, 2 = add point B.
  const [pointA, setPointA] = useState({ x: 1, y: 1 });
  const [pointB, setPointB] = useState({ x: 2, y: 2 });
  const [pos, setPos] = useState({ x: -10, y: -10 });
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

  const calculate = (pointA, pointB) => {
    let points = GetPoints({ obstacles }, { pointA }, { pointB });
    let graph = GetGraph(points, lines);
    console.log(graph);
    let last = Object.keys(graph)[Object.keys(graph).length - 1];
    let path = Algorithm(graph, "a", last.toString());
    let bestPathFormat = [];
    for (let i = 0; i < path.length; i++) {
      bestPathFormat.push([points[path[i]].x, points[path[i]].y]);
    }
    setBestPath(bestPathFormat);
  };

  return (
    <div className="maindiv">
      <header className="container">
        <button onClick={() => setMode(0)}>
          <h2>Make obstacles</h2>
        </button>
        <button onClick={() => setMode(1)}>
          <h2 className="green">Add point A</h2>
        </button>
        <button onClick={() => setMode(2)}>
          <h2 className="yellow">Add point B</h2>
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
