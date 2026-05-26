'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Palette, Code, Zap, Dice1, Heart, Star, Coffee } from 'lucide-react';
import { Navbar } from '@/components/ui/navbar';

const games = [
  {
    id: 'color-game',
    title: 'Color Memory Game',
    description: 'Test your memory with this colorful sequence game',
    icon: Palette,
    component: 'ColorGame',
  },
  {
    id: 'number-guess',
    title: 'Number Guessing Game',
    description: 'Can you guess the number I am thinking of?',
    icon: Dice1,
    component: 'NumberGame',
  },
  {
    id: 'typing-test',
    title: 'Typing Speed Test',
    description: 'How fast can you type? Test your WPM!',
    icon: Zap,
    component: 'TypingGame',
  },
];

const quotes = [
  "Code is poetry written in logic.",
  "The best error message is the one that never shows up.",
  "Programming is thinking, not typing.",
  "Clean code always looks like it was written by someone who cares.",
  "First, solve the problem. Then, write the code.",
];

// Color Memory Game Component
function ColorGame() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  const startGame = () => {
    setSequence([Math.floor(Math.random() * 4)]);
    setPlayerSequence([]);
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
  };

  const handleColorClick = (colorIndex: number) => {
    if (!isPlaying || gameOver) return;

    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1);
      setPlayerSequence([]);
      setTimeout(() => {
        setSequence([...sequence, Math.floor(Math.random() * 4)]);
      }, 1000);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Color Memory Game</h3>
      <p className="text-[var(--color-text-secondary)] mb-4">Score: {score}</p>
      
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-4">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(index)}
            className={`w-20 h-20 rounded-lg ${color} hover:opacity-80 transition-opacity`}
          />
        ))}
      </div>
      
      {!isPlaying && !gameOver && (
        <button
          onClick={startGame}
          className="px-6 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors"
        >
          Start Game
        </button>
      )}
      
      {gameOver && (
        <div>
          <p className="text-red-400 mb-2">Game Over! Final Score: {score}</p>
          <button
            onClick={startGame}
            className="px-6 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// Number Guessing Game Component
function NumberGame() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameWon, setGameWon] = useState(false);

  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setFeedback('I\'m thinking of a number between 1 and 100!');
    setGameWon(false);
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum)) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      setFeedback(`🎉 Correct! You got it in ${newAttempts} attempts!`);
      setGameWon(true);
    } else if (guessNum < targetNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }
    
    setGuess('');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Number Guessing Game</h3>
      <p className="text-[var(--color-text-secondary)] mb-4">Attempts: {attempts}</p>
      <p className="mb-4">{feedback}</p>
      
      {!gameWon && (
        <div className="space-y-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
            placeholder="Enter your guess"
            className="px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-center"
            min="1"
            max="100"
          />
          <br />
          <button
            onClick={handleGuess}
            className="px-6 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors"
          >
            Guess
          </button>
        </div>
      )}
      
      {gameWon && (
        <button
          onClick={startNewGame}
          className="px-6 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
}

// Typing Speed Test Component
function TypingGame() {
  const [text] = useState("The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for testing typing speed and accuracy.");
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);

  const handleInputChange = (value: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === text[i]) correct++;
    }
    const accuracyPercent = value.length > 0 ? (correct / value.length) * 100 : 100;
    setAccuracy(Math.round(accuracyPercent));

    // Check if complete
    if (value === text) {
      const endTime = Date.now();
      const timeInMinutes = (endTime - startTime!) / 60000;
      const wordsTyped = text.split(' ').length;
      const calculatedWpm = Math.round(wordsTyped / timeInMinutes);
      setWpm(calculatedWpm);
      setIsComplete(true);
    }
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Typing Speed Test</h3>
      
      <div className="mb-4 p-4 bg-[var(--color-surface)] rounded-lg text-left">
        <p className="font-mono text-sm leading-relaxed">
          {text.split('').map((char, index) => {
            let className = 'text-[var(--color-text-secondary)]';
            if (index < userInput.length) {
              className = userInput[index] === char ? 'text-green-400' : 'text-red-400';
            }
            return (
              <span key={index} className={className}>
                {char}
              </span>
            );
          })}
        </p>
      </div>
      
      <textarea
        value={userInput}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Start typing the text above..."
        className="w-full h-32 p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg font-mono text-sm resize-none"
        disabled={isComplete}
      />
      
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-[var(--color-text-secondary)]">
          Accuracy: {accuracy}%
        </div>
        {isComplete && (
          <div className="text-lg font-bold text-[var(--color-primary)]">
            WPM: {wpm}
          </div>
        )}
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default function Fun() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const renderGame = () => {
    switch (selectedGame) {
      case 'color-game':
        return <ColorGame />;
      case 'number-guess':
        return <NumberGame />;
      case 'typing-test':
        return <TypingGame />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
              Fun Zone
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Welcome to my playground! Here you'll find interactive games, experiments, 
              and creative coding adventures. Take a break and have some fun!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-[var(--color-surface)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass border-gradient rounded-2xl p-8"
          >
            <Code className="w-8 h-8 text-[var(--color-primary)] mx-auto mb-4" />
            <blockquote className="text-2xl md:text-3xl font-bold text-gradient mb-4">
              "{quotes[currentQuote]}"
            </blockquote>
            <p className="text-[var(--color-text-secondary)]">— Developer Wisdom</p>
          </motion.div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Interactive Games
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)]">
              Challenge yourself with these fun mini-games
            </p>
          </motion.div>

          {!selectedGame ? (
            <div className="grid md:grid-cols-3 gap-8">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedGame(game.id)}
                  className="glass border-gradient rounded-xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
                >
                  <game.icon className="w-12 h-12 text-[var(--color-primary)] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">
                    {game.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    {game.description}
                  </p>
                  <button className="px-6 py-2 bg-[var(--color-primary)] text-black rounded-lg hover:bg-[var(--color-accent)] transition-colors">
                    Play Now
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass border-gradient rounded-2xl p-8 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gradient">
                  {games.find(g => g.id === selectedGame)?.title}
                </h2>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="px-4 py-2 glass border-gradient rounded-lg hover:bg-[var(--color-surface)] transition-colors"
                >
                  Back to Games
                </button>
              </div>
              {renderGame()}
            </motion.div>
          )}
        </div>
      </section>

      {/* Fun Stats */}
      <section className="py-20 px-4 bg-[var(--color-surface)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Fun Facts About Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Coffee, stat: '∞', label: 'Cups of Coffee' },
              { icon: Code, stat: '10k+', label: 'Lines of Code' },
              { icon: Heart, stat: '100%', label: 'Passion for Tech' },
              { icon: Star, stat: '5+', label: 'Years Coding' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center glow">
                  <item.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">{item.stat}</div>
                <div className="text-[var(--color-text-secondary)]">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
