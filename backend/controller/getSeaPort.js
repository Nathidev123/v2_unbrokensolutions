const getSeaPort = async (req, res) => {
    try {
        const { query } = req.query

        if (!query || query.length < 2) {
            return res.json([])
        }

        const response = await fetch(
            `https://api.oanor.com/seaports-api/v1/search?name=${encodeURIComponent(query)}&limit=20&offset=0`,
            {
                headers: {
                    "x-oanor-key": process.env.OANOR_API_KEY
                }
            }
        )

        if (!response.ok) {
            const errorText = await response.text()

            console.error(
                "OAnor API error:",
                response.status,
                errorText
            )

            return res.status(response.status).json({
                error: "OAnor API request failed"
            })
        }

        const data = await response.json()

        console.log("OAnor response:", data)

        // Send only the results to React
        res.json(data.data.results)

    } catch (error) {
        console.error("Seaport error:", error)

        res.status(500).json({
            error: "Failed to search seaports"
        })
    }
}

module.exports = {
    getSeaPort
}