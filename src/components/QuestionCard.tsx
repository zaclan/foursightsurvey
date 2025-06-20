import React from 'react';
import type { FourSightTypeMap } from '../types';
import type { Answer, QuizQuestion } from '../data/questions';
import ImageGallery from './ImageGallery';

interface QuestionCardProps {
  question: QuizQuestion;
  currentResponses: string[];
  onSelect: (questionId: string, answerId: string) => void;
  foursightTypes: FourSightTypeMap;
  maxSelections?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  currentResponses,
  onSelect,
  foursightTypes,
  maxSelections = 2 // Default max selections to 2
}) => {
  // Check if max selections reached (only applies when adding a new selection)
  const handleSelection = (questionId: string, answerId: string) => {
    const isSelected = currentResponses.includes(answerId);
    
    // If already selected, always allow deselection
    if (isSelected) {
      onSelect(questionId, answerId);
    } else {
      // If not selected, only allow selection if under max limit
      if (currentResponses.length < maxSelections) {
        onSelect(questionId, answerId);
      }
    }
  };

  // Helper function to get the dominant type for an answer
  const getDominantType = (answer: Answer): keyof FourSightTypeMap => {
    let highestType: keyof FourSightTypeMap = 'CLARIFIER';
    let highestPoints = answer.points.CLARIFIER;
    
    if (answer.points.IDEATOR > highestPoints) {
      highestPoints = answer.points.IDEATOR;
      highestType = 'IDEATOR';
    }
    if (answer.points.DEVELOPER > highestPoints) {
      highestPoints = answer.points.DEVELOPER;
      highestType = 'DEVELOPER';
    }
    if (answer.points.IMPLEMENTER > highestPoints) {
      highestPoints = answer.points.IMPLEMENTER;
      highestType = 'IMPLEMENTER';
    }
    
    return highestType;
  };

  return (
    <div className="question-card">
      <h3>{question.text}</h3>
      
      {/* Use the ImageGallery component if images exist */}
      {question.images && question.images.length > 0 && (
        <ImageGallery images={question.images} questionId={question.id} />
      )}
      
      <p className="selection-limit">
        Select up to {maxSelections} options ({currentResponses.length}/{maxSelections} selected)
      </p>
      
      <div className="answer-options">
        {question.answers.map((answer: Answer) => {
          const dominantType = getDominantType(answer);
          const typeInfo = foursightTypes[dominantType];
          const isSelected = currentResponses.includes(answer.id);
          const isDisabled = !isSelected && currentResponses.length >= maxSelections;
          
          return (
            <div 
              key={answer.id} 
              className={`answer-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => handleSelection(question.id, answer.id)}
              style={{ 
                cursor: isDisabled ? 'not-allowed' : 'pointer', 
                opacity: isDisabled ? 0.2 : 1,
                marginBottom: '20px'
              }}
            >
              <div className="answer-content">
                <span>{answer.text}</span>
                <div className="type-indicators">
                  {Object.entries(answer.points).map(([type, points]) => 
                    points > 0 ? (
                      <span 
                        key={type} 
                        className="type-dot" 
                        title={`${foursightTypes[type as keyof FourSightTypeMap].label}: ${points} points`}
                      ></span>
                    ) : null
                  )}
                </div>
              </div>
              {isSelected && <span className="checkmark">✓</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
