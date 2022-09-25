const getChr = (oldChr, index) => {
  oldChr = oldChr.split('');

  if (index % 25 === 0) {
    oldChr[1] = String.fromCharCode(97 + (index % 25));
  }
  oldChr[1] = String.fromCharCode(97 + index);
  return oldChr.join('');
}

const GetPoints = ({ obstacles }, { pointA }, { pointB }) => {
  let points = {};
  points.aa = pointA;
  let index = 1;
  let chr = 'ab';
  for (let i = 0; i < obstacles.length; i++) {
    for (let j = 0; j < obstacles[i].length; j++) {
      chr = getChr(chr, index);
      points[chr] = obstacles[i][j];
      index++;
    }
  }
  chr = getChr(chr, index);
  points[chr] = pointB;
  return points;
};

export default GetPoints;
