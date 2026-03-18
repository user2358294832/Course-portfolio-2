"use client";

import React, { useState } from 'react';

interface QuizProps {
  question: string;
  options: string;
  correctAnswerIndex: number;
  explanation: string;
}

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswerIndex, explanation }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const optionsArray = options ? options.split('|').map(opt => opt.trim()) : [];

  if (optionsArray.length === 0) return null;

  const handleOptionClick = (index: number) => {
    // Sadece ilk tıklamayı kabul et (cevap değiştirmeyi engellemek için opsiyonel)
    if (selectedOption === null) {
      setSelectedOption(index);
      setShowExplanation(true);
    }
  };

  const isCorrect = selectedOption === correctAnswerIndex;

  return (
    <div className="border border-zinc-200 rounded-lg p-6 bg-white dark:bg-zinc-900 shadow-sm my-6">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">{question}</h3>
      
      {/* list-none ekleyerek bullet pointleri zorla kaldırıyoruz */}
      <ul className="space-y-3 list-none p-0 m-0">
        {optionsArray.map((option, index) => {
          const isThisSelected = selectedOption === index;
          const isThisCorrect = index === correctAnswerIndex;
          
          let itemStyle = "bg-zinc-50 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-100";
          
          if (selectedOption !== null) {
            if (isThisCorrect) {
              // Doğru şık her zaman yeşil yansın (kullanıcı bilse de bilmese de)
              itemStyle = "bg-emerald-100 border-emerald-500 dark:bg-emerald-900/40 dark:border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20";
            } else if (isThisSelected && !isCorrect) {
              // Kullanıcı yanlış şıkkı seçtiyse o kırmızı yansın
              itemStyle = "bg-red-100 border-red-500 dark:bg-red-900/40 dark:border-red-500 text-red-900 dark:text-red-100 ring-2 ring-red-500/20";
            }
          }

          return (
            <li
              key={index}
              className={`cursor-pointer p-4 rounded-lg border text-base transition-all duration-200 ${itemStyle}`}
              onClick={() => handleOptionClick(index)}
            >
              <div className="flex items-center">
                <span className="flex-1">{option}</span>
                {selectedOption !== null && isThisCorrect && <span className="ml-2">✅</span>}
                {selectedOption !== null && isThisSelected && !isCorrect && <span className="ml-2">❌</span>}
              </div>
            </li>
          );
        })}
      </ul>

      {showExplanation && (
        <div className={`mt-6 p-4 rounded-lg border ${isCorrect ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'}`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{isCorrect ? '🎉' : '⚠️'}</span>
            <span className={`text-lg font-bold ${isCorrect ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200'}`}>
              {isCorrect ? 'Tebrikler, Doğru Cevap!' : 'Maalesef Yanlış.'}
            </span>
          </div>
          
          <div className="text-zinc-700 dark:text-zinc-300 space-y-2">
            {!isCorrect && (
              <p>
                <strong>Doğru Cevap:</strong> <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{optionsArray[correctAnswerIndex]}</span>
              </p>
            )}
            <p>
              <strong>Açıklama:</strong> {explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
