import React, { useState } from 'react';

interface UserRegistrationProps {
  onSubmit: (userData: UserData) => void;
  onBack: () => void;
}

export interface UserData {
  name: string;
  groupNumber: string;
  classCode: string;
  avatarColor: string;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onSubmit, onBack }) => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    groupNumber: '',
    classCode: '',
    avatarColor: '#03a9f4', // Default blue color
  });

  const [errors, setErrors] = useState({
    name: '',
    groupNumber: '',
    classCode: '',
  });

  // Only the four specified avatar colors
  const avatarColors = [
    { value: '#808080', label: 'Grey' },
    { value: '#03a9f4', label: 'Blue' },
    { value: '#e74c3c', label: 'Red' },
    { value: '#ffeb3b', label: 'Yellow' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', groupNumber: '', classCode: '' };

    if (!userData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!userData.groupNumber.trim()) {
      newErrors.groupNumber = 'Group number is required';
      valid = false;
    }

    if (!userData.classCode.trim()) {
      newErrors.classCode = 'Class code is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(userData);
    }
  };

  return (
    <div className="user-registration-page">
      <div className="registration-card">
        <h2>Tell us about yourself</h2>
        <p className="subtitle">Please enter your information before starting the assessment</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="groupNumber">Group Number</label>
            <input
              type="text"
              id="groupNumber"
              name="groupNumber"
              value={userData.groupNumber}
              onChange={handleChange}
              placeholder="Enter your group number"
              className={errors.groupNumber ? 'error' : ''}
            />
            {errors.groupNumber && <span className="error-message">{errors.groupNumber}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="classCode">Class Code</label>
            <input
              type="text"
              id="classCode"
              name="classCode"
              value={userData.classCode}
              onChange={handleChange}
              placeholder="Enter your class code"
              className={errors.classCode ? 'error' : ''}
            />
            {errors.classCode && <span className="error-message">{errors.classCode}</span>}
          </div>
          
          <div className="form-group">
            <label>Choose Avatar Color</label>
            <div className="color-selector">
              {avatarColors.map(color => (
                <div 
                  key={color.value} 
                  className={`color-option ${userData.avatarColor === color.value ? 'selected' : ''}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setUserData(prev => ({ ...prev, avatarColor: color.value }))}
                  title={color.label}
                />
              ))}
            </div>
            <div className="color-preview">
              <div 
                className="avatar-preview" 
                style={{ backgroundColor: userData.avatarColor }}
              >
                {userData.name ? userData.name.charAt(0).toUpperCase() : '?'}
              </div>
              <span>Your avatar</span>
            </div>
          </div>
          
          <div className="form-buttons">
            <button type="button" onClick={onBack} className="back-button">
              Back
            </button>
            <button type="submit" className="next-button">
              Continue to Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;
