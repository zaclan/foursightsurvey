import type { UserData } from '../components/UserRegistration';

// Get API URL from environment variables with fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Track submission IDs to prevent duplicates
const submissionIds = new Set<string>();

/**
 * Generate a unique ID for a submission based on its content
 */
function getSubmissionId(userData: UserData): string {
  return `${userData.name}-${userData.classCode}-${Date.now()}`;
}

/**
 * Submit user data and profile result to the backend server
 * which will forward it to Lark Base
 */
export async function submitToLarkBase(
  userData: UserData, 
  profileResult: any
): Promise<boolean> {
  // Create a unique ID for this submission
  const submissionId = getSubmissionId(userData);
  
  // Check if this submission was already processed
  if (submissionIds.has(submissionId)) {
    console.log('Duplicate submission detected, ignoring:', submissionId);
    return false;
  }
  
  // Add to tracked submissions
  submissionIds.add(submissionId);
  
  try {
    console.log('Submitting data to:', `${API_URL}/api/submit-survey`);
    console.log('Data being sent:', { userData, profileResult });
    
    const response = await fetch(`${API_URL}/api/submit-survey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userData, 
        profileResult,
        submissionId // Include this ID with the request
      }),
      mode: 'cors',
      credentials: 'omit'
    });

    // Handle responses with error status codes
    if (!response.ok) {
      let errorMessage = `Server responded with status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        console.error('Error submitting to backend:', errorData);
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error('Could not parse error response as JSON');
      }
      
      console.error(errorMessage);
      return false;
    }

    const data = await response.json();
    console.log('Submission successful, response:', data);
    return data.success;
  } catch (error) {
    console.error('Failed to submit data:', error);
    return false;
  }
}

/**
 * Check if the backend server is reachable
 */
export async function checkServerHealth(): Promise<boolean> {
  try {
    console.log('Checking server health at:', `${API_URL}/api/health`);
    
    const response = await fetch(`${API_URL}/api/health`, {
      // Add these options for better error handling
      mode: 'cors',
      credentials: 'omit',
      method: 'GET'
    });
    
    if (!response.ok) {
      console.error(`Health check failed with status: ${response.status}`);
      return false;
    }
    
    const data = await response.json();
    console.log('Health check response:', data);
    return data.status === 'ok';
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
}
