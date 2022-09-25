const tracePath = (table, start, end) => {
  let path = [];
  let next = end;
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = table[next].vertex;
  }
  return path;
};

const formatGraph = (g) => {
  const tmp = {};
  Object.keys(g).forEach((k) => {
    const obj = g[k];
    const arr = [];
    Object.keys(obj).forEach((v) => arr.push({ vertex: v, cost: obj[v] }));
    tmp[k] = arr;
  });
  return tmp;
};

const Algorithm = (graph, start, end) => {
  let map = formatGraph(graph);

  let visited = [];
  let unvisited = [start];
  let shortestDistances = { [start]: { vertex: start, cost: 0 } };

  let vertex;
  while ((vertex = unvisited.shift())) {
    let neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    unvisited.push(...neighbors.map((n) => n.vertex));

    let costToVertex = shortestDistances[vertex].cost;

    for (let { vertex: to, cost } of neighbors) {
      let currCostToNeighbor =
        shortestDistances[to] && shortestDistances[to].cost;
      let newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor === undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        shortestDistances[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    visited.push(vertex);
  }
  return tracePath(shortestDistances, start, end);
};

export default Algorithm;
