
const getSeaPort = async (req, res) => {
    try {
        const { query } = req.query

        if(!query || query.length < 2) {
            return res.json([])
        }

        const response = await fetch(`/api/seaports?query=${encodeURIComponent(value)}`,
            {
                headers: {
                    "x-oanor-key": process.env.OANOR_API_KEY
                }
            }
        )

        const data = await response.json()

        res.json(data)
}
      catch (error) {
        console.error(error)
            res.status(500).json({
            error: "Failed to search seaports"
        })
    }
}

module.exports = {
    getSeaPort
}
