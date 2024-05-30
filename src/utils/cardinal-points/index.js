export const cardinalPoints = (bearing) => {
  let direction;

  switch (true) {
    case bearing === 0 || bearing === 360:
      direction = "North";
      break;
    case bearing > 0 && bearing < 22.5:
      direction = "North-Northeast";
      break;
    case bearing === 22.5:
      direction = "North East by North";
      break;
    case bearing > 22.5 && bearing < 45:
      direction = "Northeast";
      break;
    case bearing === 45:
      direction = "Northeast by East";
      break;
    case bearing > 45 && bearing < 67.5:
      direction = "East-Northeast";
      break;
    case bearing === 67.5:
      direction = "East by North";
      break;
    case bearing > 67.5 && bearing < 90:
      direction = "East";
      break;
    case bearing === 90:
      direction = "East by South";
      break;
    case bearing > 90 && bearing < 112.5:
      direction = "East-Southeast";
      break;
    case bearing === 112.5:
      direction = "South East by East";
      break;
    case bearing > 112.5 && bearing < 135:
      direction = "Southeast";
      break;
    case bearing === 135:
      direction = "Southeast by South";
      break;
    case bearing > 135 && bearing < 157.5:
      direction = "South-Southeast";
      break;
    case bearing === 157.5:
      direction = "South by East";
      break;
    case bearing > 157.5 && bearing < 180:
      direction = "South";
      break;
    case bearing === 180:
      direction = "South by West";
      break;
    case bearing > 180 && bearing < 202.5:
      direction = "South-Southwest";
      break;
    case bearing === 202.5:
      direction = "South West by South";
      break;
    case bearing > 202.5 && bearing < 225:
      direction = "Southwest";
      break;
    case bearing === 225:
      direction = "Southwest by West";
      break;
    case bearing > 225 && bearing < 247.5:
      direction = "West-Southwest";
      break;
    case bearing === 247.5:
      direction = "West by South";
      break;
    case bearing > 247.5 && bearing < 270:
      direction = "West";
      break;
    case bearing === 270:
      direction = "West by North";
      break;
    case bearing > 270 && bearing < 292.5:
      direction = "West-Northwest";
      break;
    case bearing === 292.5:
      direction = "North West by West";
      break;
    case bearing > 292.5 && bearing < 315:
      direction = "Northwest";
      break;
    case bearing === 315:
      direction = "Northwest by North";
      break;
    case bearing > 315 && bearing < 337.5:
      direction = "North-Northwest";
      break;
    case bearing === 337.5:
      direction = "North by West";
      break;
    case bearing > 337.5 && bearing < 360:
      direction = "North";
      break;
    default:
      direction = "Invalid bearing";
      break;
  }

  return direction;
};
