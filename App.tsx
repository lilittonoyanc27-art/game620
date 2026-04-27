import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Volume2, 
  ChevronRight, 
  X, 
  Trophy, 
  Play, 
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { LEVELS, VOCABULARY } from './constants';
import { Exercise, Level, ExerciseType } from './types';

// Components
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="h-4 w-full bg-white/30 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-full bg-gradient-to-r from-orange-400 to-amber-500 shadow-[0_0_15px_rgba(251,146,60,0.5)]"
    />
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  disabled?: boolean;
  className?: string;
}) => {
  const variants = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20',
    secondary: 'bg-white/20 hover:bg-white/30 text-sky-900 backdrop-blur-md border border-white/20',
    outline: 'border-2 border-orange-500/50 hover:border-orange-400 text-sky-900 hover:bg-white/20',
    ghost: 'text-sky-800 hover:text-sky-900 hover:bg-white/10',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white'
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, translateY: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-2xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [lives, setLives] = useState(25);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scrambledSelected, setScrambledSelected] = useState<string[]>([]);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);
  const [sortIndex, setSortIndex] = useState(0);
  const [sortItems, setSortItems] = useState<any[]>([]);
  const [sortFeedback, setSortFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const currentLevel = currentLevelIndex !== null ? LEVELS[currentLevelIndex] : null;
  const currentExercise = currentLevel?.exercises[exerciseIndex];

  useEffect(() => {
    if (currentLevelIndex !== null) {
      const level = LEVELS[currentLevelIndex];
      if (level.explanationIntro) {
        setShowIntro(true);
      }
    }
  }, [currentLevelIndex]);

  useEffect(() => {
    if (currentExercise?.type === 'SORT' && currentExercise.sortItems) {
      setSortItems([...currentExercise.sortItems]);
      setSortIndex(0);
    }
  }, [currentExercise]);

  // TTS
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleCheck = () => {
    if (!currentExercise) return;

    let isCorrect = false;
    if (currentExercise.type === 'SCRAMBLE') {
      isCorrect = scrambledSelected.join(' ').toLowerCase() === currentExercise.target.toLowerCase();
    } else {
      isCorrect = selectedOption?.toLowerCase() === currentExercise.target.toLowerCase();
    }

    if (isCorrect) {
      setFeedback('correct');
      if (currentExercise.audioText) speak(currentExercise.audioText);
    } else {
      setFeedback('incorrect');
      setLives(prev => {
        const next = prev - 1;
        if (next <= 0) setIsGameOver(true);
        return next;
      });
    }
  };

  const handleSort = (categoryId: string) => {
    if (sortFeedback || !sortItems[sortIndex]) return;
    
    const currentItem = sortItems[sortIndex];
    const isCorrect = currentItem.categoryId === categoryId;
    
    speak(currentItem.text);
    setSortFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (!isCorrect) {
      setLives(prev => {
        const next = Math.max(0, prev - 1);
        if (next === 0) setIsGameOver(true);
        return next;
      });
    }

    setTimeout(() => {
      setSortFeedback(null);
      if (sortIndex < sortItems.length - 1) {
        setSortIndex(prev => prev + 1);
      } else {
        nextExercise();
      }
    }, 1800);
  };

  const handleToggleMultiSelect = (word: string) => {
    if (feedback) return;
    setMultiSelected(prev => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const checkFindAll = () => {
    if (!currentExercise || !currentExercise.targets) return;
    
    const correctTargets = currentExercise.targets;
    const isCorrect = 
      multiSelected.length === correctTargets.length &&
      multiSelected.every(val => correctTargets.includes(val));

    if (isCorrect) {
      setFeedback('correct');
      speak('¡Correcto!');
    } else {
      setFeedback('incorrect');
      setLives(prev => {
        const next = Math.max(0, prev - 1);
        if (next === 0) setIsGameOver(true);
        return next;
      });
      speak('Inténtalo de nuevo');
    }
  };

  const nextExercise = () => {
    setFeedback(null);
    setSelectedOption(null);
    setScrambledSelected([]);
    setSortFeedback(null);
    setSortIndex(0);
    setMultiSelected([]);
    
    if (currentLevel && exerciseIndex < currentLevel.exercises.length - 1) {
      setExerciseIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const restart = () => {
    setLives(25);
    setExerciseIndex(0);
    setFeedback(null);
    setSelectedOption(null);
    setScrambledSelected([]);
    setSortFeedback(null);
    setSortIndex(0);
    setIsGameOver(false);
    setIsComplete(false);
  };

  const handleExitLevel = () => {
    setCurrentLevelIndex(null);
    restart();
  };

  if (currentLevelIndex === null) {
    return (
      <div className="min-h-screen bg-sky-400 bg-gradient-to-br from-sky-400 via-amber-100 to-orange-300 text-sky-900 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square bg-orange-400/20 rounded-full blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-2xl w-full"
        >
          <div className="mb-8 inline-block p-4 bg-white/40 rounded-[2rem] backdrop-blur-xl shadow-xl shadow-orange-500/10">
            <Trophy className="w-16 h-16 text-orange-500" />
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight text-sky-900">
            Իսպաներենի Դասընթաց
          </h1>
          <p className="text-sky-800/60 mb-12 text-lg font-medium">Սովորեք EN նախդիրը և Գույները</p>
          
          <div className="grid gap-6 w-full">
            {LEVELS.map((level, idx) => (
              <motion.button
                key={level.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  restart();
                  setCurrentLevelIndex(idx);
                }}
                className="group relative flex items-center justify-between p-8 bg-white/60 hover:bg-white/80 rounded-[3rem] shadow-xl shadow-sky-900/5 border border-white/40 transition-all text-left"
              >
                <div>
                  <span className="text-xs font-black text-orange-500 uppercase tracking-widest block mb-2">Մակարդակ {level.id}</span>
                  <h3 className="text-2xl font-bold text-sky-900">{level.title}</h3>
                  <p className="text-sky-800/50 text-sm mt-1">{level.description}</p>
                </div>
                <div className="w-14 h-14 rounded-3xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:rotate-12 transition-transform">
                  <Play className="w-6 h-6 text-white" fill="currentColor" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-sky-400 bg-gradient-to-br from-sky-400 to-white text-sky-900 flex flex-col items-center justify-center p-6 relative">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center z-10 bg-white/40 p-12 rounded-[4rem] backdrop-blur-xl border border-white">
          <XCircle className="w-24 h-24 text-rose-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Վա՜յ: Կյանքերը վերջացան</h1>
          <p className="text-sky-800/60 mb-12">Մի՛ հանձնվեք, նորից փորձեք:</p>
          <div className="flex flex-col gap-4 items-center">
            <Button onClick={restart} className="w-64">Կրկնել</Button>
            <Button variant="ghost" onClick={handleExitLevel} className="w-64">Մենյու</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-yellow-400 bg-gradient-to-br from-yellow-400 to-orange-300 text-sky-900 flex flex-col items-center justify-center p-6 relative">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center z-10 bg-white/60 p-16 rounded-[4rem] backdrop-blur-2xl shadow-2xl border border-white">
          <div className="relative">
            <Trophy className="w-32 h-32 text-orange-500 mx-auto mb-8 animate-bounce" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl -z-10" />
          </div>
          <h1 className="text-4xl font-black mb-4">Առաքելությունն ավարտված է:</h1>
          <p className="text-sky-800/60 mb-12 text-lg">Դուք հաջողությամբ ավարտեցիք այս բաժինը:</p>
          <Button onClick={handleExitLevel} className="w-64 py-5 text-xl">Շարունակել</Button>
        </motion.div>
      </div>
    );
  }

  if (showIntro && currentLevel) {
    return (
      <div className="min-h-screen bg-sky-400 bg-gradient-to-br from-sky-400 to-orange-300 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-white/70 p-12 rounded-[4rem] backdrop-blur-2xl shadow-2xl border border-white max-w-xl w-full text-center"
        >
          <div className="w-20 h-20 bg-orange-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-orange-500/30">
            <HelpCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-6 text-sky-950">{currentLevel.title}</h2>
          <p className="text-xl text-sky-900/80 leading-relaxed font-medium mb-10">
            {currentLevel.explanationIntro}
          </p>
          <Button onClick={() => setShowIntro(false)} className="w-full py-5 text-xl">
            Հասկացա, սկսե՛նք
          </Button>
        </motion.div>
      </div>
    );
  }

  const progress = (exerciseIndex / (currentLevel?.exercises.length || 1)) * 100;

  return (
    <div className="min-h-screen bg-sky-50 text-sky-900 font-sans flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6 flex items-center gap-6 max-w-4xl mx-auto w-full bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-sky-100">
        <button onClick={handleExitLevel} className="text-sky-300 hover:text-sky-500 transition-colors">
          <X className="w-8 h-8" />
        </button>
        <ProgressBar progress={progress} />
        <div className="flex items-center gap-2 text-rose-500 font-black min-w-[60px] bg-white px-4 py-2 rounded-2xl shadow-sm">
          <Heart className="w-6 h-6 fill-current" />
          <span className="text-xl">{lives}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentExercise?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col gap-8"
          >
            {/* Instruction */}
            <h2 className="text-2xl font-black text-center md:text-3xl text-sky-900">
              {currentExercise?.instruction}
            </h2>

            {/* Prompt Area */}
            {currentExercise?.type !== 'SORT' && (
              <div className="flex items-center justify-center gap-6 bg-white p-10 rounded-[4rem] shadow-xl shadow-sky-900/5 relative group border-2 border-transparent hover:border-orange-200 transition-colors">
                {currentExercise?.audioText && (
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => speak(currentExercise.audioText!)}
                    className="w-16 h-16 rounded-[1.5rem] bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors"
                  >
                    <Volume2 className="w-8 h-8 text-white" />
                  </motion.button>
                )}
                <p className="text-4xl font-black tracking-tight text-sky-950">{currentExercise?.prompt}</p>
              </div>
            )}

            {/* Answers Interaction */}
            <div className="flex flex-col gap-4 mt-4 w-full">
              {currentExercise?.type === 'SELECT' && (
                <div className="grid gap-4">
                  {currentExercise.choices?.map(choice => (
                    <button
                      key={choice}
                      onClick={() => !feedback && setSelectedOption(choice)}
                      className={`
                        w-full p-6 rounded-[2rem] text-xl font-bold border-2 transition-all text-left flex items-center justify-between shadow-sm
                        ${selectedOption === choice ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-sky-100 hover:border-sky-300 bg-white'}
                        ${feedback && choice === currentExercise.target ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : ''}
                      `}
                    >
                      {choice}
                      {selectedOption === choice && <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">✓</div>}
                    </button>
                  ))}
                </div>
              )}

              {currentExercise?.type === 'IMAGE_SELECT' && (
                <div className="grid grid-cols-2 gap-6">
                  {currentExercise.choices?.map(choice => (
                    <button
                      key={choice}
                      onClick={() => !feedback && setSelectedOption(choice)}
                      className={`
                        aspect-square p-4 rounded-[3rem] border-2 transition-all flex flex-col items-center justify-center gap-4 bg-white shadow-lg
                        ${selectedOption === choice ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-sky-100 hover:border-sky-300'}
                      `}
                    >
                      <div className="w-full h-full bg-sky-50 rounded-[2rem] flex items-center justify-center overflow-hidden">
                        {currentExercise.image ? <img src={currentExercise.image} alt={choice} className="w-full h-full object-cover" /> : <HelpCircle className="w-20 h-20 text-sky-200" />}
                      </div>
                      <span className="font-black text-lg">{choice}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentExercise?.type === 'FILL' && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentExercise.choices?.map(choice => (
                    <button
                      key={choice}
                      onClick={() => !feedback && setSelectedOption(choice)}
                      className={`
                        p-5 rounded-[1.5rem] font-black text-lg border-b-4 transition-all shadow-md
                        ${selectedOption === choice ? 'border-orange-600 bg-orange-500 text-white translate-y-1' : 'border-sky-200 bg-white hover:bg-sky-50'}
                      `}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              {currentExercise?.type === 'SCRAMBLE' && (
                <div className="flex flex-col gap-10">
                  <div className="flex flex-wrap gap-3 min-h-[100px] p-6 bg-white rounded-[2rem] shadow-inner border-2 border-sky-100">
                    {scrambledSelected.map((word, idx) => (
                      <motion.button
                        key={`${word}-${idx}`}
                        layoutId={`${word}-${idx}`}
                        className="px-6 py-3 bg-white text-sky-900 rounded-2xl font-black border-2 border-sky-100 shadow-sm"
                        onClick={() => {
                          if (feedback) return;
                          setScrambledSelected(prev => prev.filter((_, i) => i !== idx));
                        }}
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentExercise.scrambledWords?.filter(w => {
                      const countInSelected = scrambledSelected.filter(sw => sw === w).length;
                      const totalInOriginal = currentExercise.scrambledWords?.filter(ow => ow === w).length || 0;
                      return countInSelected < totalInOriginal;
                    }).map((word, idx) => (
                      <motion.button
                        key={`${word}-bank-${idx}`}
                        layoutId={`${word}-bank-${idx}`}
                        className="px-6 py-4 bg-sky-100 text-sky-900 rounded-2xl font-bold border-b-4 border-sky-300 hover:bg-sky-200 transition-colors"
                        onClick={() => {
                          if (feedback) return;
                          setScrambledSelected(prev => [...prev, word]);
                        }}
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {currentExercise?.type === 'MATCH' && (
                <div className="text-center p-16 bg-white rounded-[4rem] border-2 border-sky-100 shadow-xl">
                  <p className="text-orange-500 font-black mb-6 tracking-widest">ԿՐԿՆՈՒԹՅԱՆ ՌԵԺԻՄ</p>
                  <h3 className="text-4xl font-black text-sky-950">{currentExercise.prompt}</h3>
                  <p className="text-sky-800/60 mt-4 text-xl font-medium">{currentExercise.translation}</p>
                </div>
              )}

              {currentExercise?.type === 'SORT' && (
                <div className="flex flex-col gap-12 w-full">
                  <div className="flex justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={sortIndex}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        className={`p-12 rounded-[4rem] bg-white shadow-2xl border-4 text-center min-w-[280px] relative
                          ${sortFeedback === 'correct' ? 'border-emerald-500 bg-emerald-50' : 
                            sortFeedback === 'incorrect' ? 'border-rose-500 bg-rose-50' : 'border-sky-100'}
                        `}
                      >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
                          {sortIndex + 1} / {sortItems.length}
                        </div>
                        <h3 className="text-5xl font-black text-sky-950 mb-3">{sortItems[sortIndex]?.text}</h3>
                        <p className="text-sky-600 font-bold text-xl">{sortItems[sortIndex]?.translation}</p>
                        
                        {sortFeedback && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.2 }}
                            className="absolute -top-6 -right-6 w-16 h-16 rounded-full flex items-center justify-center text-white"
                          >
                            {sortFeedback === 'correct' ? (
                               <div className="bg-emerald-500 p-3 rounded-full shadow-lg"><CheckCircle2 className="w-8 h-8" /></div>
                            ) : (
                               <div className="bg-rose-500 p-3 rounded-full shadow-lg"><XCircle className="w-8 h-8" /></div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentExercise.categories?.map(cat => (
                      <motion.button 
                        key={cat.id} 
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSort(cat.id)} 
                        className="group relative h-48 bg-white border-2 border-sky-100 hover:border-orange-500 rounded-[3rem] p-6 shadow-xl shadow-sky-900/5 transition-all flex flex-col items-center justify-center gap-4 active:bg-orange-50"
                      >
                        <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                           <HelpCircle className="w-10 h-10 text-orange-500 group-hover:text-white" />
                        </div>
                        <span className="font-black text-lg text-sky-900 group-hover:text-orange-600 text-center">{cat.name}</span>
                        {/* Basket hint */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-orange-500 px-4 py-1 rounded-full text-white text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity">
                          ԶԱՄԲՅՈՒՂ
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {currentExercise?.type === 'FIND_ALL' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {currentExercise.choices?.map(choice => (
                    <motion.button
                      key={choice}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleMultiSelect(choice)}
                      className={`p-6 rounded-[2rem] border-2 font-bold text-xl transition-all h-24 flex items-center justify-center
                        ${multiSelected.includes(choice) 
                          ? 'bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/20' 
                          : 'bg-white border-sky-100 text-sky-900 hover:border-orange-200'}
                        ${feedback === 'incorrect' && currentExercise.targets?.includes(choice) && !multiSelected.includes(choice) ? 'border-emerald-500 border-dashed animate-pulse ring-2 ring-emerald-500/30' : ''}
                      `}
                    >
                      {choice}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Feedback */}
      <footer className="p-6 pb-12 max-w-4xl mx-auto w-full bg-transparent">
        {(!feedback && currentExercise?.type !== 'SORT') ? (
          <Button 
            disabled={
              (!selectedOption && currentExercise?.type !== 'SCRAMBLE' && currentExercise?.type !== 'MATCH' && currentExercise?.type !== 'FIND_ALL') ||
              (currentExercise?.type === 'SCRAMBLE' && scrambledSelected.length === 0) ||
              (currentExercise?.type === 'FIND_ALL' && multiSelected.length === 0)
            }
            onClick={() => {
              if (currentExercise?.type === 'MATCH') nextExercise();
              else if (currentExercise?.type === 'FIND_ALL') checkFindAll();
              else handleCheck();
            }}
            className="w-full py-6 text-2xl font-black rounded-[2rem] shadow-xl"
          >
            {currentExercise?.type === 'MATCH' ? 'ՀԱՍԿԱՆԱԼԻ Է' : 'ՍՏՈՒԳԵԼ'}
          </Button>
        ) : feedback ? (
          <motion.div 
            initial={{ y: 150 }} 
            animate={{ y: 0 }} 
            className={`fixed bottom-0 left-0 right-0 p-10 pt-12 pb-16 z-50 rounded-t-[4rem] shadow-2xl ${
              feedback === 'correct' ? 'bg-[#10b981]' : 'bg-[#f43f5e]'
            }`}
          >
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 w-full">
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shrink-0 bg-white/20 shadow-inner`}>
                  {feedback === 'correct' ? (
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-black mb-1 text-white">
                    {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}
                  </h3>
                  <p className="text-white/90 text-lg font-bold">
                    {feedback === 'correct' ? currentExercise?.translation : `Ճիշտը՝ ${currentExercise?.target}`}
                  </p>
                  {currentExercise?.explanation && (
                    <div className="mt-4 p-5 bg-black/10 rounded-[1.5rem] text-sm font-medium text-white/90 border-l-4 border-white/40">
                      <p className="text-white font-black mb-1">Բացատրություն՝</p>
                      <p className="leading-relaxed opacity-90">{currentExercise.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
              <Button 
                onClick={nextExercise} 
                className={`w-full md:w-auto px-16 py-6 text-xl font-bold bg-white text-emerald-600 hover:bg-emerald-50 shadow-none !text-sky-900 ${
                   feedback === 'incorrect' ? 'text-rose-600' : ''
                }`}
              >
                ՀԱՋՈՐԴԸ
              </Button>
            </div>
          </motion.div>
        ) : null}
      </footer>
    </div>
  );
}

