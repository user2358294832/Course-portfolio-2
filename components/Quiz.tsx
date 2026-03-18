"use client";

import React, { useState, useEffect } from 'react';

interface QuizProps {
  question: string;
  options: string;
  correctAnswerIndex: number | string;
  explanation: string;
}

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswerIndex, explanation }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Hydration hatasını önlemek için bileşenin yüklendiğinden emin oluyoruz
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Gelen index değerini sayıya çevirerek veri tipi hatasını engelliyoruz
  const targetIndex = typeof correctAnswerIndex === 'string' ? parseInt(correctAnswerIndex, 10) : correctAnswerIndex;
  const optionsArray = options ? options.split('|').map(opt => opt.trim()) : [];

  if (!isMounted || optionsArray.length === 0) return null;

  const handleOptionClick = (index: number) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };

  const isCorrect = selectedOption === targetIndex;

  return (
    <div className="my-10 p-6 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-md text-left">
      <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 leading-snug">
        {question}
      </h3>
      
      <div className="grid gap-3">
        {optionsArray.map((option, index) => {
          const isThisSelected = selectedOption === index;
          const isThisCorrect = index === targetIndex;
          
          // Varsayılan Stil
          let buttonStyle = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600";
          
          // Yanıt Verildikten Sonraki Stiller
          if (selectedOption !== null) {
            if (isThisCorrect) {
              buttonStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-2 ring-emerald-500/20";
            } else if (isThisSelected) {
              buttonStyle = "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 ring-2 ring-red-500/20";
            }
          }

          return (
            <button
              key={index}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(index)}
              className={`w-full text-left p-5 rounded-xl border-2 font-medium transition-all duration-300 flex items-center justify-between active:scale-95 ${buttonStyle}`}
            >
              <span>{option}</span>
              {selectedOption !== null && (
                <span className="text-xl">
                  {isThisCorrect ? "✅" : isThisSelected ? "❌" : ""}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className={`mt-8 p-6 rounded-xl border-l-8 animate-in fade-in slide-in-from-top-4 duration-500 ${
          isCorrect 
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500" 
            : "bg-red-50 dark:bg-red-900/20 border-red-500"
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{isCorrect ? "🌟" : "💡"}</span>
            <span className={`text-lg font-black uppercase ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
              {isCorrect ? "Harika! Doğru Cevap" : "Yanlış Seçenek"}
            </span>
          </div>
          
          <div className="text-zinc-800 dark:text-zinc-200">
            {!isCorrect && (
              <div className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">Doğru Cevap:</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-bold text-lg">{optionsArray[targetIndex]}</p>
              </div>
            )}
            <div className="text-base leading-relaxed">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Analiz:</span> {explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
