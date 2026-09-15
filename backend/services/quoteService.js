const calculateQuote = (order) => {
  const weight = Number(order.weight);
  const distanceMetres = Number(order.distanceKm);
  const distanceKm = distanceMetres / 1000;

  console.log("WEIGHT:", weight);
  console.log("DISTANCE METRES:", distanceMetres);
  console.log("DISTANCE KM:", distanceKm);

  //weight charge
  let weightCharge = weight * 15;

  let distanceCharge = 0;

  if (distanceKm <= 10) {
    distanceCharge = 55;
  } else if (distanceKm <= 25) {
    distanceCharge = 85;
  } else if (distanceKm <= 50) {
    distanceCharge = 120;
  } else {
    distanceCharge = 120 + (distanceKm - 50) * 2;
  }
  /*50kn -> 120
     60km -> 120 + (60-50)*2 = 140
     100km -> 120 + (100-50)*2 = 220
     200km -> 120 + (200-50)*2 = 420
     */
  //delivery speed charge
  let shipmentCharge = 0;

  if (order.delivery_speed === "same_day") {
    shipmentCharge = 100;
  } else if (order.delivery_speed === "tomorrow") {
    shipmentCharge = 50;
  } else if (order.delivery_speed === "normal") {
    shipmentCharge = 25;
  }

  const quoteAmount = weightCharge + distanceCharge + shipmentCharge;

  return quoteAmount;
};

module.exports = calculateQuote;
