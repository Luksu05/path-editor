import React from "react";

const Point = ({ pointX, pointY, size, color }) => (
    <circle
     cx={pointX * size}
     cy={pointY * size}
     r="10"
     fill={color}
    />
  
);

export default Point;
