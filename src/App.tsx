import { useState } from 'react'
import Quiz from './components/Quiz'
import StartPage from './components/StartPage'
import './App.css'

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="app-container">
      {!quizStarted ? (
        <StartPage onStart={handleStartQuiz} />
      ) : (
        <>
          <header className="app-header">
            <h1>FourSight Thinking Assessment</h1>
          </header>
          
          <main>
            <Quiz />
          </main>
          
        </>
      )}
    </div>
  )
}

export default App
