import React, { useEffect, useState} from 'react';
import type { Scores, FourSightTypeMap, FourSightType } from '../types';
import type { UserData } from './UserRegistration';
import { submitToLarkBase } from '../api/larkService';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [hasSubmitted, setHasSubmitted] = useState(false); // Add this to track if we've submitted
  
  // Determine the profile result based on the three criteria
  const profileResult = determineProfileResult(scores);
  
  // Convert scores to percentages for visualization
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  
  // First calculate raw percentages
  const rawPercentages: Record<string, number> = {};
  Object.entries(scores).forEach(([type, score]) => {
    rawPercentages[type] = (score / totalScore) * 100;
  });
  
  // Adjust percentages to ensure they sum to exactly 100%
  const scorePercentages: Record<string, number> = {};
  let remainingPercentage = 100;
  const types = Object.keys(scores);
  
  // Round percentages for all but the last type
  types.slice(0, -1).forEach((type) => {
    scorePercentages[type] = Math.round(rawPercentages[type]);
    remainingPercentage -= scorePercentages[type];
  });
  
  // Assign the remaining percentage to the last type to ensure sum is 100%
  scorePercentages[types[types.length - 1]] = remainingPercentage;

  // Fix the useEffect to run only once when the component mounts with userData
  useEffect(() => {
    // Only submit if we have userData and haven't submitted yet
    if (userData && !hasSubmitted) {
      const submitData = async () => {
        setSubmissionStatus('submitting');
        try {
          // Create a submission object that won't change between renders
          const submissionData = {
            primaryType: profileResult.primaryType,
            secondaryType: profileResult.secondaryType || '',
            isIntegrator: profileResult.isIntegrator,
            isDualPrimary: profileResult.isDualPrimary
          };
          
          const success = await submitToLarkBase(userData, submissionData);
          setSubmissionStatus(success ? 'success' : 'error');
        } catch (error) {
          console.error('Failed to submit results:', error);
          setSubmissionStatus('error');
        } finally {
          // Mark as submitted regardless of success to prevent retries
          setHasSubmitted(true);
        }
      };
      
      submitData();
    }
  }, [userData, hasSubmitted]);

  // Sort scores for legend display (highest to lowest)
  const sortedScoreEntries = Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA);

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
          <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
            <Pie
              data={{
                labels: sortedScoreEntries.map(([type, _]) => 
                  foursightTypes[type as keyof FourSightTypeMap].label
                ),
                datasets: [
                  {
                    data: sortedScoreEntries.map(([type, _]) => scorePercentages[type]),
                    backgroundColor: sortedScoreEntries.map(([type, _]) => 
                      foursightTypes[type as keyof FourSightTypeMap].color
                    ),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const typeKey = sortedScoreEntries[context.dataIndex][0];
                        const score = sortedScoreEntries[context.dataIndex][1];
                        const percentage = context.parsed;
                        return `${foursightTypes[typeKey as keyof FourSightTypeMap].label}: ${percentage}% (${score} pts)`;
                      }
                    }
                  },
                  legend: {
                    position: 'bottom',
                    display: false,
                  },
                              datalabels: {
                    formatter: (value, ctx) => {
                      const label = ctx.chart.data.labels?.[ctx.dataIndex] ?? '';
                      return `${label}\n${value}%`;
                    },
                    color: '#0d0c0c',
                    font: {
                      weight: 'bold',
                      size: 12
                    },
                    textAlign: 'center',
                    // Only show labels on segments that are large enough
                    display: function(context) {
                      const data = context.dataset.data;
                      const value = data && Array.isArray(data)
                        ? data[context.dataIndex]
                        : undefined;
                      return typeof value === 'number' && value > 8; // Only show if > 8%
                    }
                  }
                }
              }}
            />
          </div>
          
          <div className="pie-legend">
            {sortedScoreEntries.map(([type, score]) => {
              const typeKey = type as keyof FourSightTypeMap;
              
              return (
                <div key={type} className="legend-item">
                  <div 
                    className="legend-color" 
                    style={{ backgroundColor: foursightTypes[typeKey].color }}
                  />
                  <div className="legend-label">
                    {foursightTypes[typeKey].label}: {score} pts
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {userData && (
        <div className={`submission-status ${submissionStatus}`}>
          {submissionStatus === 'submitting' && <p>Saving your results...</p>}
          {submissionStatus === 'success' && <p>Results saved successfully!</p>}
          {submissionStatus === 'error' && <p>Failed to save results. Please take a screenshot.</p>}
        </div>
      )}
      
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
