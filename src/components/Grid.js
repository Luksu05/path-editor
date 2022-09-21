import React from "react";

const Grid = ({ width, height, size }) => {
  let index = 0;
  return (
    <React.Fragment>
      {[...new Array(width).keys()].map((x) =>
        [...new Array(height).keys()].map((y) => (
          <rect
            key={index++}
            x={`${x * size}`}
            y={y * size}
            width={size}
            height={size}
            fill="#3B429F"
            stroke="#FFCAAF"
          />
        ))
      )}
    </React.Fragment>
  );
};

export default Grid;
