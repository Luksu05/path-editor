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
  var map = formatGraph(graph);

  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, cost: 0 } };

  var vertex;
  while ((vertex = unvisited.shift())) {
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var costToVertex = shortestDistances[vertex].cost;

    for (let { vertex: to, cost } of neighbors) {
      var currCostToNeighbor =
        shortestDistances[to] && shortestDistances[to].cost;
      var newCostToNeighbor = costToVertex + cost;
      if (
        currCostToNeighbor === undefined ||
        newCostToNeighbor < currCostToNeighbor
      ) {
        // Update the table
        shortestDistances[to] = { vertex, cost: newCostToNeighbor };
      }
    }

    visited.push(vertex);
  }
  console.log(tracePath(shortestDistances, start, end));
};

export default Algorithm;
