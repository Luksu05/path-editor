const dist = (p1, p2) => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const CheckIntersection = (p1, p2, lines) => {
  for (let i = 0; i < lines.length; i++) {
    const p3 = { x: lines[i].x1, y: lines[i].y1 };
    const p4 = { x: lines[i].x2, y: lines[i].y2 };

    if (
      (p1.x === p3.x && p1.y === p3.y) ||
      (p1.x === p4.x && p1.y === p4.y) ||
      (p2.x === p3.x && p2.y === p3.y) ||
      (p2.x === p4.x && p2.y === p4.y)
    ) {
      continue;
    }
    console.log("asd");

    const c2x = p3.x - p4.x;
    const c3x = p1.x - p2.x;
    const c2y = p3.y - p4.y;
    const c3y = p1.y - p2.y;

    const d = c3x * c2y - c3y * c2x;

    const u1 = p1.x * p2.y - p1.y * p2.x;
    const u4 = p3.x * p4.y - p3.y * p4.x;

    const px = (u1 * c2x - c3x * u4) / d;
    const py = (u1 * c2y - c3y * u4) / d;

    const p = { x: px, y: py };
    if (
      Math.floor((dist(p3, p) + dist(p, p4)) * 10000) / 10000 ===
      Math.floor(dist(p3, p4) * 10000) / 10000
    ) {
      return true;
    }
  }
  return false;
};

export default CheckIntersection;
