const GetPoints = ({ obstacles }, { pointA }, { pointB }) => {
  let points = {};
  points.a = pointA;
  let index = 1;
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < obstacles[i].length; j++) {
      let chr = String.fromCharCode(97 + index);
      points[chr] = obstacles[i][j];
      index++;
    }
  }
  let chr = String.fromCharCode(97 + index);
  points[chr] = pointB;
  return points;
};

export default GetPoints;
