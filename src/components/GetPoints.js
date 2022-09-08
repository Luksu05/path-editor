const GetPoints = ({ obstacles }, { pointA }, { pointB }) => {
  let points = {};
  points.aa = pointA;
  let index = 1;
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < obstacles[i].length; j++) {
      let chr =
        String.fromCharCode(97 + (Math.floor(index / 25) % 25)) +
        String.fromCharCode(97 + (index % 25));
      points[chr] = obstacles[i][j];
      index++;
    }
  }
  let chr =
    String.fromCharCode(97 + (Math.floor(index / 25) % 25)) +
    String.fromCharCode(97 + (index % 25));
  points[chr] = pointB;
  return points;
};

export default GetPoints;
