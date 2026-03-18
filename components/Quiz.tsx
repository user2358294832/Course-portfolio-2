import React, { useState } from 'react';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-based index
  explanation: string;
}

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswerIndex, explanation }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
  };

  const isCorrect = selectedOption === correctAnswerIndex;

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white dark:bg-zinc-900 shadow-sm my-6">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">{question}</h3>
      <ul className="space-y-3">
        {options.map((option, index) => (
          <li
            key={index}
            className={`cursor-pointer p-4 rounded-md border text-base ${
              selectedOption === index
                ? isCorrect
                  ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800'
                  : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800'
            } transition-colors duration-150`}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </li>
        ))}
      </ul>
      {showExplanation && (
        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <p className={`text-lg font-medium mb-3 ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? '✅ Doğru!' : '❌ Yanlış.'}
          </p>
          <div className="text-zinc-700 dark:text-zinc-300">
            <strong>Açıklama:</strong> {explanation}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
