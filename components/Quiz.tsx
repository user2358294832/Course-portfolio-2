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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sayıya çevirme işlemini en güvenli hale getirdik
  const targetIndex = Number(correctAnswerIndex);
  // Seçenekleri parçalayıp temizliyoruz
  const optionsArray = options ? options.split('|').map(opt => opt.trim()).filter(opt => opt !== "") : [];

  if (!isMounted || optionsArray.length === 0) return null;

  const handleOptionClick = (index: number) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };

  const isCorrect = selectedOption === targetIndex;

  return (
    <div className="my-12 p-8 rounded-3xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl text-left block w-full">
      <h3 className="text-2xl font-bold mb-8 text-zinc-900 dark:text-zinc-100 leading-tight">
        {question}
      </h3>
      
      {/* flex-col ve w-full ile butonların yan yana gelmesini engelliyoruz */}
      <div className="flex flex-col gap-4 w-full">
        {optionsArray.map((option, index) => {
          const isThisSelected = selectedOption === index;
          const isThisCorrect = index === targetIndex;
          
          let statusStyle = "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300";
          
          if (selectedOption !== null) {
            if (isThisCorrect) {
              statusStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 ring-4 ring-emerald-500/10";
            } else if (isThisSelected) {
              statusStyle = "border-red-500 bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-200 ring-4 ring-red-500/10";
            }
          }

          return (
            <button
              key={index}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(index)}
              className={`w-full block text-left p-5 rounded-2xl border-2 font-semibold transition-all duration-300 relative ${statusStyle} ${selectedOption === null ? 'hover:border-zinc-400 dark:hover:border-zinc-600 active:scale-[0.98]' : ''}`}
            >
              <div className="flex items-center justify-between pointer-events-none">
                <span className="pr-4">{option}</span>
                {selectedOption !== null && (
                  <span className="text-2xl shrink-0">
                    {isThisCorrect ? "✅" : isThisSelected ? "❌" : ""}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className={`mt-10 p-6 rounded-2xl border-t-8 shadow-inner animate-in fade-in zoom-in duration-500 ${
          isCorrect 
            ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500" 
            : "bg-red-50/50 dark:bg-red-900/10 border-red-500"
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-full ${isCorrect ? "bg-emerald-500" : "bg-red-500"}`}>
              <span className="text-white text-2xl">{isCorrect ? "✓" : "!"}</span>
            </div>
            <span className={`text-xl font-black ${isCorrect ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"}`}>
              {isCorrect ? "HARİKA, DOĞRU CEVAP!" : "ÜZGÜNÜM, YANLIŞ CEVAP!"}
            </span>
          </div>
          
          <div className="text-zinc-800 dark:text-zinc-200">
            {!isCorrect && (
              <div className="mb-6 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-1">Doğru Şık:</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-black text-xl">
                  {optionsArray[targetIndex]}
                </p>
              </div>
            )}
            <div className="text-lg leading-relaxed bg-zinc-100/50 dark:bg-zinc-800/30 p-4 rounded-xl">
              <span className="font-bold text-zinc-900 dark:text-zinc-100">💡 Analiz:</span> {explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
