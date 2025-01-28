import path from "path";
import fs from "fs";

export async function GET() {
  try {
    console.log("Fetching daily answer...");

    // Resolve file path
    const filePath = path.join(process.cwd(), "public", "players.json");
    console.log("File Path:", filePath);

    // Read the JSON file
    const fileData = fs.readFileSync(filePath, "utf-8");
    console.log("File Data Loaded");

    // Parse JSON
    const jsonData = JSON.parse(fileData);
    console.log("JSON Data Parsed");

    // Flatten JSON structure to extract all players WITH their teams
    const players: any[] = [];

    for (const year in jsonData) {
      for (const team in jsonData[year]) {
        const teamPlayers = jsonData[year][team].map((player: any) => ({
          ...player,
          team, // Assign the current team to the player
        }));
        players.push(...teamPlayers);
      }
    }

    console.log("Total Players with Teams:", players.length);

    if (players.length === 0) {
      throw new Error("No players found in JSON.");
    }

    // Select a daily answer based on the current date
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const answerIndex =
      Math.abs(today.split("-").join("").charCodeAt(0)) % players.length;
    const dailyAnswer = players[answerIndex];

    if (!dailyAnswer || !dailyAnswer.name) {
      throw new Error("Selected player is invalid.");
    }

    console.log("Selected Daily Answer:", dailyAnswer);

    return new Response(JSON.stringify({ dailyAnswer }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching daily answer:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch daily answer" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
