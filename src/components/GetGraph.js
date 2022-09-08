import CheckIntersection from "./CheckIntersection";

const dist = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const GetGraph = (points, lines) => {
  let graph = {};
  let tmp = {};
  let intersecting = [];
  let size = Object.keys(points).length;
  for (let i = 0; i < size; i++) {
    let chri =
      String.fromCharCode(97 + (Math.floor(i / 25) % 25)) +
      String.fromCharCode(97 + (i % 25));
    for (let j = 0; j < size; j++) {
      let chrj =
        String.fromCharCode(97 + (Math.floor(j / 25) % 25)) +
        String.fromCharCode(97 + (j % 25));
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
