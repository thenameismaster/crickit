"use client";

import { useState, useEffect } from "react";

const iplTeams = [
  "Mumbai Indians",
  "Chennai Super Kings",
  "Royal Challengers Bangalore",
  "Kolkata Knight Riders",
  "Delhi Capitals",
  "Rajasthan Royals",
  "Punjab Kings",
  "Sunrisers Hyderabad",
  "Gujarat Titans",
  "Lucknow Super Giants",
];

const cricketCountries = [
  "India",
  "Australia",
  "England",
  "South Africa",
  "Pakistan",
  "New Zealand",
  "Sri Lanka",
  "West Indies",
  "Bangladesh",
  "Afghanistan",
];

const playerPositions = {
  Batsman: ["Opening Batsman", "Middle Order Batsman"],
  Bowler: ["Fast Bowler", "Spinner"],
  Allrounder: ["Batting All-Rounder", "Bowling All-Rounder"],
};

export default function Activity1Page() {
  const [dailyAnswer, setDailyAnswer] = useState<any>(null);
  const [questionsLeft, setQuestionsLeft] = useState(10);
  const [guessesLeft, setGuessesLeft] = useState(3);
  const [feedback, setFeedback] = useState<
    { question: string; response: boolean }[]
  >([]);
  const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null);
  const [childOptions, setChildOptions] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [sliderValue, setSliderValue] = useState<number>(15);
  const [guess, setGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const level1Options = [
    "Current Team",
    "Past Team",
    "Player Position",
    "Country",
    "Age",
  ];

  useEffect(() => {
    async function fetchDailyAnswer() {
      try {
        const res = await fetch("/api/dailyAnswer");
        if (!res.ok) throw new Error("Failed to fetch daily answer");
        const data = await res.json();
        setDailyAnswer(data.dailyAnswer);
      } catch (error) {
        console.error("Error fetching daily answer:", error);
      }
    }
    fetchDailyAnswer();
  }, []);

  const handleLevel1Click = (option: string) => {
    if (selectedLevel1 !== option) {
      setSelectedLevel1(option);
      setChildOptions([]);
      setSelectedQuestions([]);
    }

    if (option === "Current Team" || option === "Past Team") {
      setChildOptions(iplTeams);
    } else if (option === "Player Position") {
      setChildOptions(["Batsman", "Bowler", "Allrounder"]);
    } else if (option === "Country") {
      setChildOptions(cricketCountries);
    } else if (option === "Age") {
      setChildOptions(["Less Than", "More Than"]);
    }
  };

  const handleChildClick = (option: string) => {
    if (selectedQuestions.includes(option)) {
      setSelectedQuestions(selectedQuestions.filter((item) => item !== option));
    } else {
      setSelectedQuestions([...selectedQuestions, option]);

      if (["Batsman", "Bowler", "Allrounder"].includes(option)) {
        setChildOptions(
          playerPositions[option as keyof typeof playerPositions]
        );
      }
    }
  };

  const handleAsk = () => {
    if (questionsLeft <= 0 || gameOver) return;

    let question = "";
    if (selectedLevel1 === "Age") {
      question = `${selectedLevel1}: ${
        selectedQuestions.includes("Less Than")
          ? `Less Than ${sliderValue}`
          : `More Than ${sliderValue}`
      }`;
    } else {
      question = `${selectedLevel1}: ${selectedQuestions.join(", ")}`;
    }

    let isCorrect = false;

    if (dailyAnswer) {
      if (selectedLevel1 === "Current Team" || selectedLevel1 === "Past Team") {
        isCorrect = selectedQuestions.some(
          (team) => dailyAnswer.team && dailyAnswer.team === team
        );
      } else if (selectedLevel1 === "Country") {
        isCorrect =
          dailyAnswer.country &&
          selectedQuestions.includes(dailyAnswer.country);
      } else if (selectedLevel1 === "Player Position") {
        isCorrect =
          dailyAnswer.position &&
          selectedQuestions.includes(dailyAnswer.position);
      } else if (selectedLevel1 === "Age") {
        if (dailyAnswer.birthYear) {
          const playerAge = new Date().getFullYear() - dailyAnswer.birthYear;
          isCorrect = selectedQuestions.includes("Less Than")
            ? playerAge < sliderValue
            : playerAge > sliderValue;
        }
      }
    }

    setFeedback([...feedback, { question, response: isCorrect }]);
    setQuestionsLeft((prev) => prev - 1);

    setSelectedQuestions([]);
    setChildOptions([]);
    setSelectedLevel1(null);
  };

  const handleGuessSubmit = () => {
    if (gameOver || guessesLeft <= 0) return;

    const isCorrect =
      dailyAnswer && guess.toLowerCase() === dailyAnswer.name.toLowerCase();

    setFeedback([
      ...feedback,
      { question: `Guess: ${guess}`, response: isCorrect },
    ]);

    if (isCorrect) {
      setGameOver(true);
    } else if (guessesLeft === 1) {
      setShowAnswer(true);
      setGameOver(true);
    }

    setGuessesLeft((prev) => prev - 1);
    setGuess("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold mb-4">Guess the IPL Player</h1>

      <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 relative">
        <div className="text-3xl text-white font-bold absolute">?</div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-3xl w-full">
        <p className="mb-2">
          Ask a question by selecting one of the options below:
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {level1Options.map((option) => (
            <button
              key={option}
              onClick={() => handleLevel1Click(option)}
              className={`px-4 py-2 rounded text-white ${
                selectedLevel1 === option
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {childOptions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {childOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleChildClick(option)}
                className={`px-4 py-2 rounded text-white ${
                  selectedQuestions.includes(option)
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {selectedLevel1 === "Age" && selectedQuestions.length > 0 && (
          <div className="flex items-center gap-4 mb-6">
            <input
              type="range"
              min="15"
              max="45"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full"
            />
            <span>{sliderValue} years</span>
          </div>
        )}

        <button
          onClick={handleAsk}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white mb-6"
          disabled={selectedQuestions.length === 0 && selectedLevel1 !== "Age"}
        >
          Ask
        </button>

        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <p className="font-bold">Feedback:</p>
          {feedback.map((item, index) => (
            <p key={index} className="mt-2">
              <span className="font-bold text-blue-400">{item.question}:</span>{" "}
              <span
                className={item.response ? "text-green-500" : "text-red-500"}
              >
                {item.response ? "True" : "False"}
              </span>
            </p>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="font-bold mb-2">Make a Guess</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter player's name"
              className="flex-grow px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />
            <button
              onClick={handleGuessSubmit}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
              disabled={guessesLeft <= 0}
            >
              Submit Guess
            </button>
          </div>
        </div>

        {showAnswer && dailyAnswer && (
          <div className="mt-4">
            <p className="text-red-500 font-bold">
              Game Over! The correct answer was: {dailyAnswer.name} (
              {dailyAnswer.teams.join(", ")}, {dailyAnswer.country})
            </p>
          </div>
        )}

        <p className="mt-4">
          <strong>Questions Remaining:</strong> {questionsLeft}
        </p>
        <p className="mt-2">
          <strong>Guesses Remaining:</strong> {guessesLeft}
        </p>
      </div>
    </div>
  );
}
