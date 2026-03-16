const fetch = require("node-fetch");

const app = express();

// Example endpoint:
// https://your-backend.onrender.com/getPlayerCount?gameId=123456

app.get("/getPlayerCount", async (req, res) => {
    const gameId = req.query.gameId;

    if (!gameId) {
        return res.status(400).json({ error: "No gameId provided" });
    }

    try {
        const response = await fetch(`https://games.roblox.com/v1/games?universeIds=${gameId}`);
        const data = await response.json();

        const game = data.data[0];

        res.json({
            playing: game.playing,
            visits: game.visits,
            maxPlayers: game.maxPlayers
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Roblox data" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});