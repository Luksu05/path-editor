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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

let obstacles = [];
let lines = [];

const App = () => {
  const [mode, setMode] = React.useState("Obstacle");
  const [pointA, setPointA] = useState({ x: 1, y: 1 });
  const [pointB, setPointB] = useState({ x: 2, y: 2 });
  const [pos, setPos] = useState({ x: -10, y: -10 });
  const [obstacle, setObstacle] = useState([]);
  const [bestPath, setBestPath] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const tileSize = 8;
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
    const [x, y] = [pos.x / gridSize, pos.y / gridSize];
    switch (mode) {
      case "Obstacle":
        if (obstacle.length && x === obstacle[0].x && y === obstacle[0].y) {
          obstacles.push(obstacle);
          lines = GetLines({ obstacles });
          setObstacle([]);
        } else {
          setObstacle([...obstacle, { x, y }]);
        }
        break;
      case "Point A":
        setPointA({ x, y });
        break;
      case "Point B":
        setPointB({ x, y });
        break;
      default:
        console.log("Error!");
    }
  };

  const calculate = (pointA, pointB) => {
    let points = GetPoints({ obstacles }, { pointA }, { pointB });
    let graph = GetGraph(points, lines);
    let last = Object.keys(graph)[Object.keys(graph).length - 1];
    let path = Algorithm(graph, "a", last.toString());
    let bestPathFormat = [];
    for (let i = 0; i < path.length; i++) {
      bestPathFormat.push([points[path[i]].x, points[path[i]].y]);
    }
    setBestPath(bestPathFormat);
  };

  const handleMode = (event, newMode) => {
    if (newMode !== null) {
      if (newMode === "Calculate") calculate(pointA, pointB);
      else setMode(newMode);
    }
  };

  return (
    <div className="maindiv">
      <header className="container">
        <ToggleButtonGroup
          value={mode}
          exclusive
          className="buttons"
          onChange={handleMode}
          aria-label="toggle mode"
        >
          <ToggleButton className="button" value="Obstacle">
            <h3>Make Obstacles</h3>
          </ToggleButton>
          <ToggleButton className="button" value="Point A">
            <h3>Add point</h3>
            <h3 className="AColor">A</h3>
          </ToggleButton>
          <ToggleButton className="button" value="Point B">
            <h3>Add point</h3>
            <h3 className="BColor">B</h3>
          </ToggleButton>
          <ToggleButton className="button" value="Calculate">
            <h3>Calculate</h3>
          </ToggleButton>
        </ToggleButtonGroup>
      </header>
      <div className="innerdiv">
        <div className="path-editor-container">
          <div className="name-div">
            <h1>Path</h1>
          </div>
          <div>
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
                color="#87ace0"
              />
              <Point
                pointX={pointB.x}
                pointY={pointB.y}
                size={gridSize}
                color="#9187e0"
              />
              <Path bestPath={bestPath} />
              <circle cx={pos.x} cy={pos.y} r="5" fill="red" />
            </svg>
          </div>
          <div className="name-div">
            <h1>Editor</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
