import path from "path";
import fs from "fs";

export async function GET() {
  try {
    // Log step-by-step
    console.log("Fetching daily answer...");

    // Resolve file path
    const filePath = path.join(process.cwd(), "public", "players.json");
    console.log("File Path:", filePath);

    // Read the file
    const fileData = fs.readFileSync(filePath, "utf-8");
    console.log("File Data Loaded");

    // Parse the JSON
    const jsonData = JSON.parse(fileData);
    console.log("JSON Data:", jsonData);

    // Flatten the JSON structure to get all players
    const players = Object.values(jsonData).flatMap((teams: any) =>
      Object.values(teams).flat()
    );
    console.log("Flattened Players Array:", players);

    // Check if players array is valid
    if (!players || players.length === 0) {
      throw new Error("No players found in the JSON data.");
    }

    // Determine the daily answer
    const today = new Date().toISOString().slice(0, 10);
    const answerIndex =
      Math.abs(today.split("-").join("").charCodeAt(0)) % players.length;
    const dailyAnswer = players[answerIndex];

    console.log("Daily Answer:", dailyAnswer);

    // Return the daily answer
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
