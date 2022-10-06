// area of the intersection of two circles
const IntersectionArea = (r1, r2, distance) => {
  // Distance between circle centers
  if (distance >= r1 + r2) {
    return 0;
  }
  if (distance <= Math.abs(r1 - r2)) {
    return Math.PI * Math.min(r1, r2) ** 2;
  }

  const f1 = 2 * Math.acos((r1 ** 2 - r2 ** 2 + distance ** 2) / (2 * r1 * distance));
  const f2 = 2 * Math.acos((r2 ** 2 - r1 ** 2 + distance ** 2) / (2 * r2 * distance));

  const s1 = (r1 * r1 * (f1 - Math.sin(f1))) / 2;
  const s2 = (r2 * r2 * (f2 - Math.sin(f2))) / 2;

  return s1 + s2;
};

const findDistance = (R1, R2, neededIntersectionS): {R1: number, R2: number, neededIntersectionS: number} => {
  let maxDistance = R1 + R2;
  if (neededIntersectionS === 0) {
    return maxDistance;
  }
  if (neededIntersectionS >= Math.PI * R1 ** 2 || neededIntersectionS >= Math.PI * R2 ** 2) {
    return 0;
  }

  const accuracy = 0.1;
  let raoc = 0;
  // resulting area of intersection

  let minDistance = 0;
  let distance = maxDistance;
  // Binary Search
  while (Math.abs(raoc - neededIntersectionS) > accuracy) {
    distance = Math.abs(maxDistance - minDistance) / 2 + minDistance;
    raoc = IntersectionArea(R1, R2, distance);

    if (raoc > neededIntersectionS) {
      minDistance = distance;
    }
    if (raoc < neededIntersectionS) {
      maxDistance = distance;
    }
  }
  return distance;
};
export default findDistance;
