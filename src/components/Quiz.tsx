import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import Results from './Results';
import { questions, foursightTypeInfo } from '../data/questions';
import type { Scores } from '../types';
import type { UserData } from './UserRegistration';

// Type definition for responses with multiple answers per question
type MultiResponses = Record<string, string[]>;

const MAX_SELECTIONS = 2;

interface QuizProps {
  userData: UserData | null;
}

const Quiz: React.FC<QuizProps> = ({ userData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [responses, setResponses] = useState<MultiResponses>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [scores, setScores] = useState<Scores | null>(null);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    // Get current answers for this question (or empty array if none)
    const currentAnswers = responses[questionId] || [];
    
    let newAnswers: string[];
    
    // Toggle selection: If already selected, remove it; otherwise add it
    if (currentAnswers.includes(answerId)) {
      newAnswers = currentAnswers.filter(id => id !== answerId);
    } else {
      newAnswers = [...currentAnswers, answerId];
    }
    
    setResponses({
      ...responses,
      [questionId]: newAnswers
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
      setIsCompleted(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = () => {
    // Initialize scores
    const finalScores: Scores = {
      CLARIFIER: 0,
      IDEATOR: 0,
      DEVELOPER: 0,
      IMPLEMENTER: 0
    };

    // Calculate scores based on responses
    Object.entries(responses).forEach(([questionId, answerIds]) => {
      const question = questions.find(q => q.id === questionId);
      if (question) {
        answerIds.forEach(answerId => {
          const selectedAnswer = question.answers.find(a => a.id === answerId);
          if (selectedAnswer) {
            // Add points from each answer to all profile types
            finalScores.CLARIFIER += selectedAnswer.points.CLARIFIER;
            finalScores.IDEATOR += selectedAnswer.points.IDEATOR;
            finalScores.DEVELOPER += selectedAnswer.points.DEVELOPER;
            finalScores.IMPLEMENTER += selectedAnswer.points.IMPLEMENTER;
          }
        });
      }
    });

    setScores(finalScores);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setIsCompleted(false);
    setScores(null);
  };

  const currentQuestion = questions[currentQuestionIndex];
  // Get current responses for this question (or empty array)
  const currentResponses = currentQuestion ? (responses[currentQuestion.id] || []) : [];
  // Require at least one answer selected to proceed
  const isAnswered = currentResponses.length > 0;

  if (isCompleted && scores) {
    return <Results scores={scores} onReset={resetQuiz} foursightTypes={foursightTypeInfo} userData={userData} />;
  }

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <div className="question-number">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      
      <QuestionCard 
        question={currentQuestion}
        currentResponses={currentResponses}
        onSelect={handleAnswerSelect}
        foursightTypes={foursightTypeInfo}
        maxSelections={MAX_SELECTIONS}
      />
      
      <div className="navigation-buttons">
        <button 
          onClick={goToPreviousQuestion} 
          disabled={currentQuestionIndex === 0}
          className="nav-button"
        >
          Previous
        </button>
        <button 
          onClick={goToNextQuestion} 
          disabled={!isAnswered}
          className="nav-button primary"
        >
          {currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
