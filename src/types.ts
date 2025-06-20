export type FourSightType = 'CLARIFIER' | 'IDEATOR' | 'DEVELOPER' | 'IMPLEMENTER' | 'INTEGRATOR';

export interface Question {
  id: string;
  text: string;
  type: FourSightType;
  reverseScore: boolean;
}

export interface FourSightTypeInfo {
  label: string;
  description: string;
  color: string;
  image: string;
}

export type FourSightTypeMap = {
  [key in FourSightType]: FourSightTypeInfo;
};

export type Responses = Record<string, number>;
export type MultiResponses = Record<string, string[]>;

export interface Scores {
  CLARIFIER: number;
  IDEATOR: number;
  DEVELOPER: number;
  IMPLEMENTER: number;
}

// Define the quiz state for our application
export interface QuizState {
  responses: MultiResponses;
  currentQuestionIndex: number;
  isCompleted: boolean;
  scores: Scores | null;
}