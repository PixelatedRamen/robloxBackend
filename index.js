const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/getPlayerCount", async (req, res) => {
  const placeId = req.query.gameId;

  try {
    // STEP 1: Convert Place ID → Universe ID
    const universeRes = await fetch(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    const universeData = await universeRes.json();

    const universeId = universeData.universeId;

    // STEP 2: Get game data using Universe ID
    const gameRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const gameData = await gameRes.json();

    const game = gameData.data[0];

    res.json({
      playing: game.playing,
      visits: game.visits,
      maxPlayers: game.maxPlayers
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
