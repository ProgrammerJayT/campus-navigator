export const calculateBearing = (lat1, lng1, lat2, lng2) => {
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const λ1 = toRadians(lng1);
  const λ2 = toRadians(lng2);

  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  const θ = Math.atan2(y, x);
  const bearing = toDegrees(θ);
  return ((bearing + 360) % 360).toFixed(2); // Normalize to 0-360 degrees
};

const toRadians = (degrees) => degrees * (Math.PI / 180);

const toDegrees = (radians) => radians * (180 / Math.PI);
