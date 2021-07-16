const deg2rad = deb => {
  return deb * (Math.PI / 180);
};

const distanceLatLonInKm = (centerCoordinates, pointCoordinates) => {
  try {
    const radius = 6371;

    const {latitude: lat1, longitude: lon1} = centerCoordinates;
    const {latitude: lat2, longitude: lon2} = pointCoordinates;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * center;
    return distance;
  } catch (err) {
    return '';
  }
};

const distanteFormat = (
  centerCoordinates,
  pointCoordinates,
  integer = true,
) => {
  const result = distanceLatLonInKm(centerCoordinates, pointCoordinates);
  if (result && result !== '') {
    let number = result.toFixed(2);
    if (number < 1) {
      return `${(result * 1000).toFixed(0)} m`;
    } else {
      if (integer) {
        return `${parseInt(number, 10)} km`;
      }
      return `${number} km`;
    }
  }

  return '';
};

export default distanteFormat;
export {distanteFormat, distanceLatLonInKm};
