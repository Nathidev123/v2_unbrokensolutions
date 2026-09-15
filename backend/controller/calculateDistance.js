const axios = require("axios");
//messenger of the rq and res to google maps

const calculateDistance = async (req, res) => {
  const { pickupAddress, dropOffAddress } = req.body;

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        //using axios send an Http post request to Google
        origin: {
          address: pickupAddress,
        },
        destination: {
          address: dropOffAddress,
        },
        travelMode: "DRIVE",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
        },
      },
    );

    //A check if cant find a route between the two addresses
    if (
      !response.data.routes ||
      response.data.routes.length === 0 ||
      !response.data.routes[0].distanceMeters
    ) {
      return res.status(404).json({
        error: "No valid route found between the provided addresses",
      });
    }
    const distance = response.data.routes[0].distanceMeters;

    const duration = response.data.routes[0].duration;

    res.status(200).json({
      distance,
      duration,
    });
  } catch (error) {
    console.log(error.response?.data || error);

    res.status(500).json({
      error: "Failed to calculate distance",
    });
  }
};

module.exports = {
  calculateDistance,
};
