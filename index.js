const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/getPlayerCount", async (req, res) => {
  const placeId = req.query.gameId;

  try {
    // Convert Place ID → Universe ID
    const universeRes = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    const universeData = await universeRes.json();

    if (!universeData.universeId) {
      return res.status(400).json({ error: "Invalid Place ID" });
    }

    const universeId = universeData.universeId;

    // Get game data
    const gameRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const gameData = await gameRes.json();

    if (!gameData.data || gameData.data.length === 0) {
      return res.status(400).json({ error: "Game not found" });
    }

    const game = gameData.data[0];

    res.json({
      playing: game.playing,
      visits: game.visits,
      maxPlayers: game.maxPlayers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
