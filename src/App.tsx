import { useState } from 'react'
import Quiz from './components/Quiz'
import StartPage from './components/StartPage'
import UserRegistration, { type UserData } from './components/UserRegistration'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'registration' | 'quiz'>('start');
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleStartClick = () => {
    setCurrentScreen('registration');
  };
  
  const handleRegistrationSubmit = (data: UserData) => {
    setUserData(data);
    setCurrentScreen('quiz');
  };
  
  const handleRegistrationBack = () => {
    setCurrentScreen('start');
  };

  return (
    <div className="app-container">
      {currentScreen === 'start' && (
        <StartPage onStart={handleStartClick} />
      )}
      
      {currentScreen === 'registration' && (
        <UserRegistration 
          onSubmit={handleRegistrationSubmit}
          onBack={handleRegistrationBack}
        />
      )}
      
      {currentScreen === 'quiz' && (
        <>
          <header className="app-header">
            <h1>Thinking Preference Assessment</h1>
            {userData && (
              <div className="user-info">
                <div 
                  className="user-avatar" 
                  style={{ backgroundColor: userData.avatarColor }}
                >
                  {userData.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-details">
                  <span className="user-name">{userData.name}</span>
                  <span className="user-group">Group {userData.groupNumber} | {userData.classCode}</span>
                </div>
              </div>
            )}
          </header>
          
          <main>
            <Quiz userData={userData} />
          </main>
        </>
      )}
    </div>
  )
}

export default App
