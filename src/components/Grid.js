import React from "react";

const Grid = ({ width, height, size }) => {
  return (
    <React.Fragment>
      {[...new Array(width).keys()].map((x) =>
        [...new Array(height).keys()].map((y) => (
          <rect
            x={`${x * size}`}
            y={y * size}
            width={size}
            height={size}
            fill="none"
            stroke="black"
          />
        ))
      )}
    </React.Fragment>
  );
};

export default Grid;
