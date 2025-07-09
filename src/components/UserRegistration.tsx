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
    avatarColor: 'Yellow', 
  });

  const [errors, setErrors] = useState({
    name: '',
    groupNumber: '',
    classCode: '',
  });

  const avatarColors = [
    { value: '#ffeb3b', label: 'Yellow' },
    { value: '#e74c3c', label: 'Red' },
    { value: '#03a9f4', label: 'Blue' },
    { value: '#808080', label: 'Grey' }
  ];

  const groupNumberOptions = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  
  const classCodeOptions = ['ami1701', 'ami1702'];

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

    if (!userData.groupNumber) {
      newErrors.groupNumber = 'Group number is required';
      valid = false;
    }

    if (!userData.classCode) {
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
            <select
              id="groupNumber"
              name="groupNumber"
              value={userData.groupNumber}
              onChange={handleChange}
              className={errors.groupNumber ? 'error' : ''}
            >
              <option value="">Select Group Number</option>
              {groupNumberOptions.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            {errors.groupNumber && <span className="error-message">{errors.groupNumber}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="classCode">Class Code</label>
            <select
              id="classCode"
              name="classCode"
              value={userData.classCode}
              onChange={handleChange}
              className={errors.classCode ? 'error' : ''}
            >
              <option value="">Select Class Code</option>
              {classCodeOptions.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
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
                  onClick={() => setUserData(prev => ({ ...prev, avatarColor: color.label }))}
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
