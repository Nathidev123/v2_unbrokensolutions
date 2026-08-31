

const calculateQuote = (order) => {

    const weight = Number(order.weight)
    const distanceKm = Number(order.distanceKm)

    let weightCharge = weight * 15

    let distanceCharge = 0

    if (distanceKm <= 10) {
        distanceCharge = 55
    } else if (distanceKm <= 25) {
        distanceCharge = 85
    } else if (distanceKm <= 50) {
        distanceCharge = 120
    }

    let shipmentCharge = 0

    if (order.delivery_speed === 'same_day') {
        shipmentCharge = 100
    } else if (order.delivery_speed === 'tomorrow') {
        shipmentCharge = 50
    } else if (order.delivery_speed === 'normal') {
        shipmentCharge = 25
    }

    const quoteAmount =
        weightCharge +
        distanceCharge +
        shipmentCharge

    return quoteAmount
}

module.exports = calculateQuote



