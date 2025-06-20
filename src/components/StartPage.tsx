import React from 'react';

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="start-page">
      <div className="start-card">
        <h1>FourSight Thinking Assessment</h1>
        
        <div className="instructions">
          <h2>Instructions</h2>
          <ul>
            <li>Please choose up to two options (preferably one) that resonates with you </li>
            <li>if you are unsure of what you did/what you said during the game, you may discuss with your teammates to let them help you try to recall.</li>
            <li>Do not take pictures/screenshot the photos in this questionnaire. They are copyrighted. .</li>
          </ul>
          
          <div className="types-preview">
            <h3>The Four Thinking Preferences:</h3>
            <div className="type-chips">
              <div className="type-chip clarifier">Clarifier</div>
              <div className="type-chip ideator">Ideator</div>
              <div className="type-chip developer">Developer</div>
              <div className="type-chip implementer">Implementer</div>
            </div>
          </div>
        </div>
        
        <button onClick={onStart} className="start-button">
          Begin Assessment
        </button>
        
        <p className="footnote">Based on the FourSight Thinking Framework by Gerard Puccio, PhD</p>
      </div>
    </div>
  );
};

export default StartPage;
