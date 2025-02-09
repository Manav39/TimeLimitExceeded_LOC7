import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  const allQuestions = [
    {
      scenario: "What is the largest organ in the human body?",
      options: ["Skin", "Liver", "Brain", "Heart"],
      correctAnswer: 0,
    },
    {
      scenario:
        "Which organ is primarily responsible for regulating blood sugar levels?",
      options: ["Liver", "Pancreas", "Kidney", "Heart"],
      correctAnswer: 1,
    },
    {
      scenario:
        "What is the term for a medical professional who specializes in the treatment of bones?",
      options: ["Orthopedist", "Cardiologist", "Dermatologist", "Neurologist"],
      correctAnswer: 0,
    },
    {
      scenario: "Which of the following is a common symptom of a heart attack?",
      options: [
        "Nausea",
        "Severe headache",
        "Shortness of breath",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      scenario: "What is the medical term for high blood pressure?",
      options: ["Hypertension", "Hyperglycemia", "Hyperthermia", "Hypotension"],
      correctAnswer: 0,
    },
    {
      scenario:
        "Which vitamin is produced by the body when exposed to sunlight?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin D", "Vitamin C"],
      correctAnswer: 2,
    },
    {
      scenario: "What condition is caused by a deficiency in vitamin C?",
      options: ["Rickets", "Scurvy", "Scurvy", "Osteoporosis"],
      correctAnswer: 1,
    },
    {
      scenario:
        "Which organ is responsible for filtering toxins from the blood?",
      options: ["Liver", "Kidney", "Spleen", "Heart"],
      correctAnswer: 1,
    },
    {
      scenario: "What type of blood vessel carries blood away from the heart?",
      options: ["Arteries", "Veins", "Capillaries", "Lymphatic vessels"],
      correctAnswer: 0,
    },
    {
      scenario:
        "Which disease is caused by the uncontrolled growth of abnormal cells in the body?",
      options: ["Diabetes", "Cancer", "Influenza", "Tuberculosis"],
      correctAnswer: 1,
    },
    {
      scenario:
        "What is the medical term for the condition commonly known as 'lazy eye'?",
      options: ["Astigmatism", "Strabismus", "Amblyopia", "Myopia"],
      correctAnswer: 2,
    },
    {
      scenario:
        "Which of the following is NOT a function of the human skeleton?",
      options: [
        "Support",
        "Blood cell production",
        "Storage of fat",
        "Digestion",
      ],
      correctAnswer: 3,
    },
    {
      scenario:
        "Which part of the brain is responsible for regulating balance and coordination?",
      options: ["Cerebellum", "Cerebrum", "Medulla Oblongata", "Hypothalamus"],
      correctAnswer: 0,
    },
    {
      scenario:
        "What is the condition of having too much glucose in the blood?",
      options: [
        "Hyperglycemia",
        "Hypoglycemia",
        "Hypertension",
        "Hyperthermia",
      ],
      correctAnswer: 0,
    },
    {
      scenario:
        "Which type of diabetes is characterized by the body's inability to produce insulin?",
      options: [
        "Type 1 Diabetes",
        "Type 2 Diabetes",
        "Gestational Diabetes",
        "Hypoglycemia",
      ],
      correctAnswer: 0,
    },
    {
      scenario: "What is the most common blood type in the human population?",
      options: ["Type A", "Type B", "Type O", "Type AB"],
      correctAnswer: 2,
    },
    {
      scenario:
        "Which of the following is a risk factor for developing cardiovascular disease?",
      options: [
        "High cholesterol",
        "Obesity",
        "Lack of exercise",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      scenario: "What does an EKG (electrocardiogram) measure?",
      options: [
        "Blood pressure",
        "Heart rhythm",
        "Lung capacity",
        "Brain activity",
      ],
      correctAnswer: 1,
    },
    {
      scenario: "Which condition is caused by a deficiency of vitamin D?",
      options: ["Rickets", "Scurvy", "Osteoporosis", "Hypercalcemia"],
      correctAnswer: 0,
    },
    {
      scenario: "What is the normal pH level of human blood?",
      options: ["7.2", "7.4", "8.0", "6.9"],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    // Randomly shuffle the questions and pick the first 10
    const randomQuestions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuestions(randomQuestions);
  }, []);

  useEffect(() => {
    // Check that questions array is populated and currentQuestion is valid
    if (questions.length > 0 && currentQuestion >= questions.length) {
      setIsGameOver(true);
    }
  }, [currentQuestion, questions]);

  const handleAnswerClick = (index) => {
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion === questions.length - 1) {
      setIsGameOver(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsGameOver(false);
    // Re-randomize the questions when restarting the game
    const randomQuestions = [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuestions(randomQuestions);
  };

  return (
    <div className="bg-white text-red-600 font-sans min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">🩺 Medical Trivia</h1>
      {isGameOver ? (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Trivia Completed!</h2>
          <p className="text-xl mb-6">
            Your Score: <span className="font-bold">{score}</span> /{" "}
            {questions.length}
          </p>
          {score < 5 ? (
            <p className="text-lg text-red-500 font-medium">
              "Don't worry! Knowledge grows with effort. Keep learning! 🌟"
            </p>
          ) : (
            <p className="text-lg text-green-600 font-medium">
              "Fantastic work! You're on the path to becoming a health expert!
              🏆"
            </p>
          )}
          <button
            className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-400"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        questions.length > 0 && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
            <h2 className="text-2xl font-semibold mb-6">
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <p className="text-lg mb-8">
              {questions[currentQuestion].scenario}
            </p>
            <div className="flex flex-col gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="bg-red-200 hover:bg-red-300 text-red-700 px-4 py-2 rounded-lg text-left font-medium shadow"
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
