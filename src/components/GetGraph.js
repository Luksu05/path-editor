import CheckIntersection from "./CheckIntersection";

const dist = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const GetGraph = (points, lines) => {
  /* const graph = {
    a: { b: 5, c: 2 },
    b: { a: 5, c: 7, d: 8 },
    c: { a: 2, b: 7, d: 4, e: 8 },
    d: { b: 8, c: 4, e: 6, f: 4 },
    e: { c: 8, d: 6, f: 3 },
    f: { e: 3, d: 4 },
  }; */
  console.log(points);
  let graph = {};
  let tmp = {};
  let intersecting = [];
  let size = Object.keys(points).length;
  for (let i = 0; i < size; i++) {
    let chri = String.fromCharCode(97 + i);
    for (let j = 0; j < size; j++) {
      let chrj = String.fromCharCode(97 + j);
      if (CheckIntersection(points[chri], points[chrj], lines) === false) {
        intersecting.push(chrj);
      }
    }
    console.log(chri);
    for (let i = 0; i < intersecting.length; i++) {
      if (intersecting[i] !== chri) {
        let weight = dist(points[intersecting[i]], points[chri]);
        console.log(weight);
        tmp[intersecting[i]] = weight;
        console.log(tmp);
      }
    }
    tmp = {};
    intersecting = [];
  }

  return graph;
};

export default GetGraph;
