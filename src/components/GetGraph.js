import CheckIntersection from "./CheckIntersection";

const dist = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const getChr = (oldChr, index) => {
  oldChr = oldChr.split('');

  if (index % 25 === 0) {
    oldChr[1] = String.fromCharCode(97 + (index % 25));
  }
  oldChr[1] = String.fromCharCode(97 + index);
  return oldChr.join('');
}

const GetGraph = (points, lines) => {
  let graph = {};
  let tmp = {};
  let intersecting = [];
  let size = Object.keys(points).length;
  let chri = String.fromCharCode(97) + String.fromCharCode(97);
  let chrj = String.fromCharCode(97) + String.fromCharCode(97);

  for (let i = 0; i < size; i++) {
    chri = getChr(chri, i);
    for (let j = 0; j < size; j++) {
      chrj = getChr(chrj, j);
      if (CheckIntersection(points[chri], points[chrj], lines) === false) {
        intersecting.push(chrj);
      }
    }
    for (let i = 0; i < intersecting.length; i++) {
      if (intersecting[i] !== chri) {
        let weight = dist(points[intersecting[i]], points[chri]);
        tmp[intersecting[i]] = weight;
      }
    }
    graph[chri] = tmp;
    tmp = {};
    intersecting = [];
  }
  return graph;
};

export default GetGraph;
