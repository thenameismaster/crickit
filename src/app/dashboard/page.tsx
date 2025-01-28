"use client";

import TopBar from "@/components/TopBar";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Bar */}
      <TopBar />

      {/* Dashboard Body */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Select an Activity:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Card: Activity 1 */}
            <Link href="/activity1">
              <div className="bg-blue-600 hover:bg-blue-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/activity1.png"
                  alt="Guess the Player?"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Guess the Player</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Guess the player by asking question
                </p>
              </div>
            </Link>

            {/* Card: Activity 2 */}
            <Link href="/activity2">
              <div className="bg-green-600 hover:bg-green-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Player Stats"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Player Stats</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Dive into detailed player statistics.
                </p>
              </div>
            </Link>

            {/* Card: Activity 3 */}
            <Link href="/activity3">
              <div className="bg-yellow-600 hover:bg-yellow-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Team Analysis"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Team Analysis</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Analyze team performances.
                </p>
              </div>
            </Link>

            {/* Card: Activity 4 */}
            <Link href="/activity4">
              <div className="bg-red-600 hover:bg-red-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Game Strategies"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Game Strategies</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Learn expert strategies.
                </p>
              </div>
            </Link>

            {/* Card: Activity 5 */}
            <Link href="/activity5">
              <div className="bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Tournament Insights"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Tournament Insights</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Deep dive into tournaments.
                </p>
              </div>
            </Link>

            {/* Card: Activity 6 */}
            <Link href="/activity6">
              <div className="bg-purple-600 hover:bg-purple-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Live Scores"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Live Scores</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Check live game updates.
                </p>
              </div>
            </Link>

            {/* Card: Activity 7 */}
            <Link href="/activity7">
              <div className="bg-teal-600 hover:bg-teal-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Crickit Bingo"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Crickit Bingo</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Play exciting cricket games.
                </p>
              </div>
            </Link>

            {/* Card: Activity 8 */}
            <Link href="/activity8">
              <div className="bg-pink-600 hover:bg-pink-700 transition-all shadow-lg rounded-lg p-6 cursor-pointer">
                <img
                  src="/placeholder.webp"
                  alt="Fantasy League"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h2 className="text-xl font-bold mt-4">Fantasy League</h2>
                <p className="text-sm text-gray-300 mt-2">
                  Create your dream team.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
