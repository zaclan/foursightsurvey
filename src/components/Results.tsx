import React from 'react';
import type { Scores, FourSightTypeMap, FourSightType } from '../types';
import type { UserData } from './UserRegistration';

interface ResultsProps {
  scores: Scores;
  onReset: () => void;
  foursightTypes: FourSightTypeMap;
  userData?: UserData | null;
}

interface ProfileResult {
  primaryType: FourSightType | 'INTEGRATOR';
  secondaryType?: FourSightType | null;
  isIntegrator: boolean;
  isDualPrimary: boolean;
}

const Results: React.FC<ResultsProps> = ({ scores, onReset, foursightTypes, userData }) => {
  // Determine the profile result based on the three criteria
  const profileResult = determineProfileResult(scores);
  
  // Convert scores to percentages for visualization
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const scorePercentages: Record<string, number> = {};
  
  Object.entries(scores).forEach(([type, score]) => {
    scorePercentages[type] = Math.round((score / totalScore) * 100);
  });

  return (
    <div className="results-container">
      <div className="primary-result">
        
        
        {/* Primary profile */}
        <div 
          className="dominant-type"
          style={{ backgroundColor: foursightTypes[profileResult.primaryType].color + '30' }}
        >
          <h3>Your dominant thinking preference:</h3>
          <img 
            src={foursightTypes[profileResult.primaryType].image} 
            alt={foursightTypes[profileResult.primaryType].label} 
            className="dominant-type-image"
          />
          <h2>
            {profileResult.isDualPrimary && profileResult.secondaryType 
              ? `${foursightTypes[profileResult.primaryType].label} & ${foursightTypes[profileResult.secondaryType].label}`
              : foursightTypes[profileResult.primaryType].label
            }
          </h2>
          <p>{foursightTypes[profileResult.primaryType].description}</p>
          
          <div className="type-details">
            <div className="strengths">
              <h4>Strengths</h4>
              <ul>
                {foursightTypes[profileResult.primaryType].strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className="weaknesses">
              <h4>Limitations</h4>
              <ul>
                {foursightTypes[profileResult.primaryType].limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* If there's a secondary profile and not a dual primary */}
          {profileResult.secondaryType && !profileResult.isDualPrimary && (
            <div className="secondary-profile">
              <h3>Your secondary thinking preference:</h3>
              <div className="secondary-profile-info" style={{ 
                backgroundColor: foursightTypes[profileResult.secondaryType].color + '20',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <div className="secondary-profile-header">
                  <img 
                    src={foursightTypes[profileResult.secondaryType].image} 
                    alt={foursightTypes[profileResult.secondaryType].label} 
                    className="secondary-type-image"
                  />
                  <div>
                    <h4>{foursightTypes[profileResult.secondaryType].label}</h4>
                    <p>{foursightTypes[profileResult.secondaryType].description}</p>
                  </div>
                </div>
                
                <div className="secondary-type-details">
                  <div className="secondary-strengths">
                    <h5>Strengths</h5>
                    <ul>
                      {foursightTypes[profileResult.secondaryType].strengths.slice(0, 3).map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="secondary-limitations">
                    <h5>Limitations</h5>
                    <ul>
                      {foursightTypes[profileResult.secondaryType].limitations.slice(0, 2).map((limitation, index) => (
                        <li key={index}>{limitation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* For integrator profile, show balanced types */}
          {profileResult.isIntegrator && (
            <div className="integrator-details">
              <p><strong>Your balanced preferences:</strong></p>
              <div className="balanced-types">
                {Object.entries(scores).map(([type, score]) => (
                  <span 
                    key={type} 
                    className="balanced-type-chip"
                    style={{ backgroundColor: foursightTypes[type as keyof FourSightTypeMap].color }}
                  >
                    {foursightTypes[type as keyof FourSightTypeMap].label}: {score} pts
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

// Helper function to determine the profile result based on the three criteria
function determineProfileResult(scores: Scores): ProfileResult {
  // Convert scores object to array of [type, score] pairs
  const scoreEntries = Object.entries(scores) as [FourSightType, number][];
  
  // Sort scores in descending order
  const sortedScores = [...scoreEntries].sort((a, b) => b[1] - a[1]);
  
  // Calculate total score
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  // Get highest and second highest scores
  const highestType = sortedScores[0][0];
  const highestScore = sortedScores[0][1];
  const secondHighestType = sortedScores[1][0];
  const secondHighestScore = sortedScores[1][1];
  const lowestScore = sortedScores[sortedScores.length - 1][1];
  
  // Criterion 1: If a single profile dominates more than 30% of total points
  const highestPercentage = (highestScore / totalScore) * 100;

  // Criterion 2: If all profiles are within 4 points, show as integrator
  if (highestScore - lowestScore <= 4) {
    return {
      primaryType: 'INTEGRATOR',
      isIntegrator: true,
      isDualPrimary: false
    };
  }

  if (highestPercentage > 30) {
    // Criterion 3: Check if top two profiles are within 2 points
    if (highestScore - secondHighestScore <= 2) {
      if (highestScore === secondHighestScore) {
        // If tied, show both as primary
        return {
          primaryType: highestType,
          secondaryType: secondHighestType,
          isIntegrator: false,
          isDualPrimary: true
        };
      } else {
        // Show second highest as secondary
        return {
          primaryType: highestType,
          secondaryType: secondHighestType,
          isIntegrator: false,
          isDualPrimary: false
        };
      }
    } else {
      // Single dominant profile
      return {
        primaryType: highestType,
        secondaryType: null,
        isIntegrator: false,
        isDualPrimary: false
      };
    }
  }
  
  
  // Criterion 3: If top two profiles are within 2 points
  if (highestScore - secondHighestScore <= 2) {
    if (highestScore === secondHighestScore) {
      // If tied, show both as primary
      return {
        primaryType: highestType,
        secondaryType: secondHighestType,
        isIntegrator: false,
        isDualPrimary: true
      };
    } else {
      // Show second highest as secondary
      return {
        primaryType: highestType,
        secondaryType: secondHighestType,
        isIntegrator: false,
        isDualPrimary: false
      };
    }
  }
  
  // Default case: Show highest scoring profile
  return {
    primaryType: highestType,
    secondaryType: null,
    isIntegrator: false,
    isDualPrimary: false
  };
}

export default Results;
