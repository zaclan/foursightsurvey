import React from 'react';
import type { Scores, FourSightTypeMap } from '../types';
import type { UserData } from './UserRegistration';

interface ResultsProps {
  scores: Scores;
  onReset: () => void;
  foursightTypes: FourSightTypeMap;
  userData?: UserData | null;
}

const Results: React.FC<ResultsProps> = ({ scores, onReset, foursightTypes, userData }) => {
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
      {userData && (
        <div className="results-user-info">
          <div 
            className="results-user-avatar" 
            style={{ backgroundColor: userData.avatarColor }}
          >
            {userData.name.charAt(0).toUpperCase()}
          </div>
          <div className="results-user-details">
            <h3>{userData.name}</h3>
            <p>Group {userData.groupNumber} | Class {userData.classCode}</p>
          </div>
        </div>
      )}
      
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
          
          <div className="type-details">
            <div className="strengths">
              <h4>Strengths</h4>
              <ul>
                {foursightTypes[displayTypeKey].strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className="weaknesses">
              <h4>Limitations</h4>
              <ul>
                {foursightTypes[displayTypeKey].limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
          </div>
          
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
        <div className="pie-chart-container">
          <div className="pie-chart">
            {Object.entries(scores).map(([type, _], index, array) => {
              const typeKey = type as keyof FourSightTypeMap;
              const percentage = scorePercentages[type];
              
              // Calculate the pie chart sectors
              let previousPercentage = 0;
              for (let i = 0; i < index; i++) {
                previousPercentage += scorePercentages[array[i][0]];
              }
              
              // Convert percentages to degrees for the pie slices
              const startDegree = (previousPercentage / 100) * 360;
              const endDegree = startDegree + (percentage / 100) * 360;
              
              // Generate the CSS for the pie slice
              const background = `conic-gradient(
                transparent ${startDegree}deg,
                ${foursightTypes[typeKey].color} ${startDegree}deg,
                ${foursightTypes[typeKey].color} ${endDegree}deg,
                transparent ${endDegree}deg
              )`;
              
              return (
                <div 
                  key={type}
                  className="pie-slice"
                  style={{ background }}
                />
              );
            })}
          </div>
          
          <div className="pie-legend">
            {Object.entries(scores).map(([type, score]) => {
              const typeKey = type as keyof FourSightTypeMap;
              const percentage = scorePercentages[type];
              
              return (
                <div key={type} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: foursightTypes[typeKey].color }}
                  />
                  <div className="legend-label">
                    {foursightTypes[typeKey].label}: {percentage}% ({score} pts)
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={onReset} className="reset-button">Take the Test Again</button>
      </div>
    </div>
  );
};

export default Results;
