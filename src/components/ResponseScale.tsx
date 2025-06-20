import React from 'react';

interface ResponseScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const ResponseScale: React.FC<ResponseScaleProps> = ({ value, onChange }) => {
  const options = [1, 2, 3, 4, 5]; // 1-5 scale

  return (
    <div className="response-scale">
      <div className="scale-labels">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      <div className="scale-options">
        {options.map(option => (
          <button
            key={option}
            className={`scale-option ${value === option ? 'selected' : ''}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResponseScale;
