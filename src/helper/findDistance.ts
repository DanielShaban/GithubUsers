// area of the intersection of two circles
const IntersectionArea = (r1: number, r2: number, distance: number) => {
  // distance - Distance between circle centers
  // r1,r2 - Radius of circles
  if (distance >= r1 + r2) {
    return 0;
  }
  // No intersection
  if (distance <= Math.abs(r1 - r2)) {
    return Math.PI * Math.min(r1, r2) ** 2;
  }
  // Inner circle

  const f1 = 2 * Math.acos((r1 ** 2 - r2 ** 2 + distance ** 2) / (2 * r1 * distance));
  const f2 = 2 * Math.acos((r2 ** 2 - r1 ** 2 + distance ** 2) / (2 * r2 * distance));

  const s1 = (r1 * r1 * (f1 - Math.sin(f1))) / 2;
  const s2 = (r2 * r2 * (f2 - Math.sin(f2))) / 2;

  return s1 + s2;
};

const findDistance = (R1: number, R2: number, neededIntersectionArea: number) => {
  let maxDistance = R1 + R2;
  let minDistance = 0;
  // left and Right in Binary Search

  if (neededIntersectionArea === 0) {
    return maxDistance;
  }
  const calculateS = (R:number) => Math.PI * R ** 2;
  if (neededIntersectionArea >= calculateS(R1) || neededIntersectionArea >= calculateS(R2)) {
    return 0;
  }
  // Inner circle

  const accuracy = 0.1;
  let raoc = 0;
  // resulting area of intersection
  // We put the Distance between circles to find the area of the intersection
  // and if this area > or < needed Intersection Area
  let distance = maxDistance;

  // Next is Binary Search
  while (Math.abs(raoc - neededIntersectionArea) > accuracy) {
    distance = (maxDistance + minDistance) / 2;
    // Center in Binary Search
    raoc = IntersectionArea(R1, R2, distance);
    // here we put our distance to find if it is the correct intersection area

    if (raoc > neededIntersectionArea) {
      minDistance = distance;
    }
    if (raoc < neededIntersectionArea) {
      maxDistance = distance;
    }
  }
  return distance;
  // needed distance to get  Intersection area
};

export default findDistance;
