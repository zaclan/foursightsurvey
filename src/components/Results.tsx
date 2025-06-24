import React from 'react';
import type { Scores, FourSightTypeMap } from '../types';

interface ResultsProps {
  scores: Scores;
  onReset: () => void;
  foursightTypes: FourSightTypeMap;
}

const Results: React.FC<ResultsProps> = ({ scores, onReset, foursightTypes }) => {
  // Find the highest score type and its score
  const highestScore = Object.entries(scores).reduce(
    (highest, [type, score]) => (score > highest.score ? { type, score } : highest),
    { type: '', score: 0 }
  );
  
  const highestScoreType = highestScore.type as keyof Scores;
  
  // Check if any other profile is within one point of the highest score
  const isIntegrator = Object.entries(scores).some(([type, score]) => {
    return type !== highestScoreType && Math.abs(score - highestScore.score) <= 1;
  });
  
  // Determine which profile to display
  const displayTypeKey = isIntegrator ? 'INTEGRATOR' : highestScoreType;
  
  // Find profiles that are within one point of the highest score (for integrator details)
  const closeProfiles = Object.entries(scores)
    .filter(([_ , score]) => Math.abs(score - highestScore.score) <= 1)
    .map(([type]) => type as keyof Scores);

  // Convert scores to percentages for visualization
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const scorePercentages: Record<string, number> = {};
  
  Object.entries(scores).forEach(([type, score]) => {
    scorePercentages[type] = Math.round((score / totalScore) * 100);
  });

  return (
    <div className="results-container">
      
      <div className="primary-result">
        <h3>Your dominant thinking preference:</h3>
        <div 
          className="dominant-type"
          style={{ backgroundColor: foursightTypes[displayTypeKey].color + '30' }}
        >
          <img 
            src={foursightTypes[displayTypeKey].image} 
            alt={foursightTypes[displayTypeKey].label} 
            className="dominant-type-image"
          />
          <h2>{foursightTypes[displayTypeKey].label}</h2>
          <p>{foursightTypes[displayTypeKey].description}</p>
          
          {isIntegrator && (
            <div className="integrator-details">
              <p><strong>Your balanced preferences:</strong></p>
              <div className="balanced-types">
                {closeProfiles.map((type) => (
                  <span 
                    key={type} 
                    className="balanced-type-chip"
                    style={{ backgroundColor: foursightTypes[type].color }}
                  >
                    {foursightTypes[type].label}: {scores[type]} pts
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="score-breakdown">
        <h3>Your Complete Profile:</h3>
        <div className="score-bars">
          {Object.entries(scores).map(([type, score]) => (
            <div key={type} className="score-item">
              <div className="score-label">
                {foursightTypes[type as keyof FourSightTypeMap].label}
              </div>
              <div className="score-bar-container">
                <div 
                  className="score-bar" 
                  style={{ 
                    width: `${scorePercentages[type]}%`,
                    backgroundColor: foursightTypes[type as keyof FourSightTypeMap].color 
                  }}
                ></div>
              </div>
              <div className="score-value">{score} pts</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={onReset} className="reset-button">Take the Test Again</button>
      </div>
    </div>
  );
};

export default Results;
