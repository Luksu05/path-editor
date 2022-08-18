import React from "react";

let lines = [];

const GetLines = ({ obstacles }) => {
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
    return lines;
  }
};

export default GetLines;
