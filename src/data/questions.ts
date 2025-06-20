import type { FourSightType } from '../types';
import testImage from './test.jpeg';
import clariferImage from './profiles/clarifier.png';
import ideatorImage from './profiles/ideators.png';
import developerImage from './profiles/developers.png';
import implementerImage from './profiles/implementers.png';   
import integratorImage from './profiles/integrator.png';

export interface Answer {
  id: string;
  text: string;
  points: {
    CLARIFIER: number;
    IDEATOR: number;
    DEVELOPER: number;
    IMPLEMENTER: number;
  };
}

export interface QuizQuestion {
  id: string;
  text: string;
  images?: string[]; // Array of image URLs - optional
  answers: Answer[];
}

export const questions: QuizQuestion[] = [
  {
    id: 'q1',
    text: 'When you entered the game, did you do/say any of the following? ',
    images: [
      // Example: '/images/question1-image1.jpg',
      // Multiple images can be added here
    ],
    answers: [
      { 
        id: 'q1a1', 
        text: 'I like to define the problem first. " Guys are we supposed to go to the bottom? Is that where the destination is?" ', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q1a2', 
        text: 'I like to brainstorm the possible solutions first, “ we can try to split according to 2-2, or 3-1, or maybe we all go one side first”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 1, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q1a3', 
        text: 'I am a just do it type of person. [Immediately goes to one of the path upon entering the challenge]', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q1a4', 
        text: 'I like to think about what needs to be done in order for the solution to be feasible. “Okay, we may need to split up. [Someone] you can go with [Someone], I will go with [Someone]” [try to issue instructions to the team]', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
    ]
  },
  {
    id: 'q2',
    text: 'On the fifth floor, when you have to hold a button for your teammate on the same side, did you do/say any of the following?',
    images: [
      // Example: '/images/question2-image1.jpg',
      // Multiple images can be added here
    ],
    answers: [
      { 
        id: 'q2a1', 
        text: 'I want to understand how the broken staircase works. “Am I supposed to hold the button to repair the staircase? How long do I hold the button for?”', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q2a2', 
        text: 'I want to have detailed information in structured format such as:  “ First go to step on the button, then release the button after the teammate has passed through, then you can move forward. ”', 
        points: { 
          CLARIFIER: 1, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q2a3', 
        text: 'I want to come up with feasible solutions. “Let me try stepping on this button first and then [teammate on same side] can try going forward if the staircase repairs” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q2a4', 
        text: 'I want to think of cool solutions to deal with the broken staircase. “There’s a gap, should we try jumping? Or both of us stand on the button together?” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
    ]
  },
  {
    id: 'q3',
    text: 'On the fourth floor (where one team needs to step on the button for the other team on the other side to go through), did you do/say any of the following?',
    images: [
      // Example: '/images/question3-image1.jpg',
      // Multiple images can be added here
      testImage
    ],
    answers: [
      { 
        id: 'q3a1', 
        text: 'I need to see some motion rather than just talking. [Immediately step on whatever button or immediately move forward when the gap closes.]', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q3a2', 
        text: 'I need to fully understand how the teams coordinate. “ the staircases here are broken right? Does the other side have buttons? Are the other side supposed to help close our gaps?” ', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 1, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q3a3', 
        text: 'I need to think of creative ways to let people on both stairs to go through. “Let`s try to step the buttons above us which we passed just now?”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 1, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q3a4', 
        text: 'I need to design the solution and make sure it is possible for the two teams to coordinate. “Okay everyone do not move, one person move at a time, [someone] step on a button and see what happens, [someone] go forward to the safe spot, [someone] do not release” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
    ]
  },
  {
    id: 'q4',
    text: 'when there is a button on the plank between the gap, did you do or say any of the following?',
    images: [
      // Example: '/images/question4-image1.jpg',
      // Multiple images can be added here
    ],
    answers: [
      { 
        id: 'q4a1', 
        text: 'I like to use trial and error to test out rather than think of solutions. “Guys what do we do we are stuck, just tell me what to do”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q4a2', 
        text: 'I like to think of what to do and whether it is possible.This button looks different, it seems that need someone to step on the first button and then the second one to step on the button of the plank between the gap.Let me go step on it to see what will happen.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
          IMPLEMENTER: 1 
        } 
      },
      { 
        id: 'q4a3', 
        text: 'I like to observe and understand the details. “Let`s do this, [someone] step on the button, and everyone else do not step on the button, let`s see what this button is controlling? ”', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q4a4', 
        text: 'I like to be challenged with complex problems and solve them. We both are already on the button on our side, I think you guys can move forward, let us know what happen on your side. “Let`s try jumping on the button to see if it is safe” ', 
        points: { 
          CLARIFIER: 1, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
    ]
  },
  {
    id: 'q5',
    text: 'When you reached the second floor, where there are 4 buttons with different combinations, did you do/say any of the following?',
    images: [
      // Example: '/images/question5-image1.jpg',
      // Multiple images can be added here
    ],
    answers: [
      { 
        id: 'q5a1', 
        text: 'I need to see some motion rather than just talking. [Immediately step on whatever button or immediately move forward when the gap closes.]', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q5a2', 
        text: 'I need to fully understand how the teams coordinate. “ the staircases here are broken right? Does the other side have buttons? Are the other side supposed to help close our gaps?” ', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 1 
        } 
      },
      { 
        id: 'q5a3', 
        text: 'I need to think of creative ways to let people on both stairs to go through. “Let`s try to step the buttons above us which we passed just now?”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 1, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q5a4', 
        text: 'I need to design the solution and make sure it is possible for the two teams to coordinate. “Okay everyone do not move, one person move at a time, [someone] step on a button and see what happens, [someone] go forward to the safe spot, [someone] do not release” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
    ]
  },
];

export const foursightTypeInfo = {
  CLARIFIER: {
    label: 'Clarifier',
    description: 'These individuals prefer to define and understand the problem. They are detail-oriented and like to gather data and facts before making decisions.',
    color: '#3498db', // Blue
    image: clariferImage
  },
  IDEATOR: {
    label: 'Ideator',
    description: 'These individuals excel at generating ideas and prefer brainstorming and thinking outside the box. They are imaginative and enjoy challenging the status quo.',
    color: '#f1c40f', // Yellow
    image: ideatorImage
  },
  DEVELOPER: {
    label: 'Developer',
    description: 'These individuals prefer to design and develop solutions. They are analytical and like to test and refine ideas to ensure their feasibility.',
    color: '#2ecc71', // Green
    image: developerImage
  },
  IMPLEMENTER: {
    label: 'Implementer',
    description: 'These individuals prefer to take action and implement solutions. They are practical, task-oriented, and like to see tangible results.',
    color: '#e74c3c', // Red
    image: implementerImage
  },
  
  INTEGRATOR: {
    label: 'Integrator',
    description: 'These individuals has a balanced profile across the four roles, able to shift between clarifying, ideating, developing, and implementing as needed. Such an individual would be adept at integrating the different stages of the problem-solving and innovation process',
    color: '#9b59b6', // Purple
    image: integratorImage
  }
};
