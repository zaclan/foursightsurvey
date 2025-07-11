import clariferImage from './profiles/clarifier.png';
import ideatorImage from './profiles/ideators.png';
import developerImage from './profiles/developers.png';
import implementerImage from './profiles/implementers.png';   
import integratorImage from './profiles/integrator.png';
import q3_1Image from './images/q3_1.jpg';
import q3_2Image from './images/q3_2.jpg';
// New image imports
import q1_1Image from './images/Q1-1.jpg';
import q1_2Image from './images/Q1-2.jpg';
import q2_1Image from './images/Q2-1.jpg';
import q2_2Image from './images/Q2-2.jpg';
import q4_1Image from './images/Q4-1.jpg';
import q4_2Image from './images/Q4-2.jpg';
import q5_1Image from './images/Q5-1.jpg';
import q5_2Image from './images/Q5-2.jpg';
import q6_1Image from './images/Q6-1.jpg';
import q6_2Image from './images/Q6-2.jpg';
import q7_1Image from './images/Q7-1.jpg';
import q7_2Image from './images/Q7-2.jpg';
import q8_1Image from './images/Q8-1.jpg';

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
    text: 'When you entered the game, did you do/say any of the following?',
    images: [
      q1_1Image
    ],
    answers: [
      { 
        id: 'q1a1', 
        text: 'I like to define the problem first. " Guys are we supposed to go to the bottom? Is that where the destination is?"', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q1a2', 
        text: 'I like to brainstorm the possible solutions first, “ we can try to split according to 2-2, or 3-1, or maybe we all go one side first.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 1, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q1a3', 
        text: 'I am a just do it type of person. [Immediately goes to one of the path upon entering the challenge].', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q1a4', 
        text: 'I like to think about what needs to be done in order for the solution to be feasible. “Okay, we may need to split up. [Someone] you can go with [Someone], I will go with [Someone]” [try to issue instructions to the team].', 
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
      q2_1Image
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
        text: 'I want to have detailed information in structured format such as:  “ First go to step on the button, then release the button after the teammate has passed through, then you can move forward.”', 
        points: { 
          CLARIFIER: 1, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q2a3', 
        text: 'I want to come up with feasible solutions. “Let me try stepping on this button first and then [teammate on same side] can try going forward if the staircase repairs.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q2a4', 
        text: 'I want to think of cool solutions to deal with the broken staircase. “There’s a gap, should we try jumping? Or both of us stand on the button together?”', 
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
      q3_1Image
    ],
    answers: [
      { 
        id: 'q3a1', 
        text: 'I need to see some motion rather than just talking. [Immediately step on whatever button or immediately move forward when the gap closes].', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q3a2', 
        text: 'I need to fully understand how the teams coordinate. “ the staircases here are broken right? Does the other side have buttons? Are the other side supposed to help close our gaps?”', 
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
        text: 'I need to design the solution and make sure it is possible for the two teams to coordinate. “Okay everyone do not move, one person move at a time, [someone] step on a button and see what happens, [someone] go forward to the safe spot, [someone] do not release.”', 
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
      q4_1Image
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
      q5_1Image
    ],
    answers: [
      { 
        id: 'q5a1', 
        text: 'I tend to always give many different interesting options when confronted with new challenges. [Steps on the 4 buttons to see what will happen].', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
          IMPLEMENTER: 1 
        } 
      },
      { 
        id: 'q5a2', 
        text: 'I tend to be meticulous in planning how to deal with challenges. “I observe there are four buttons on our side and there are four sections on the other side. Let’s call the buttons 1,2,3 and 4, I will step on each button and see which gap closes. If i step on button 1 and that gap closes, we can call that gap “gap 1”, so we find out which button matches which gap.”', 
        points: { 
          CLARIFIER: 1, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0
        } 
      },
      { 
        id: 'q5a3', 
        text: 'I tend to want to understand the 4 buttons and the situation. “ What do you see on your side? Can you see our side? We see 4 buttons/ a large gap, do we see different things or same things?”', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q5a4', 
        text: 'I tend to trial and error rather than thinking over to figure things out first. [Goes past the 4 buttons and tries to reach the bottom] or says “guys there a huge hole in front of us.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
    ]
  },
  {
    id: 'q6',
    text: 'At the beginning of the game, when someone falls down, did you do/say any of the following? ',
    images: [
      q6_1Image
    ],
    answers: [
      { 
        id: 'q6a1', 
        text: 'I prefer to gather information before deciding whether to save the person or do anything else. “What do you see below? Is it the destination? Can you get up yourself? Do you need the whole team to drop and  if so why?”', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q6a2', 
        text: 'I prefer to make quick decisions and focus on finding the solution. [Jumps down too or runs around the place in circles and explore around].', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 1, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q6a3', 
        text: 'I prefer to think of many ways to save the person that fell and take action without detailed planning. “Maybe just [someone] jump down or maybe you(the person that fell) wait at the bottom for us or we see if we can get to the destination without that person.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
          IMPLEMENTER: 1 
        } 
      },
      { 
        id: 'q6a4', 
        text: 'I prefer to focus on one idea and carry it out. “[someone] fell, ok so you need to try coming up by going up the staircase and see if it is possible.”', 
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
    id: 'q7',
    text: 'When you fell down, did you do/say any of the following?',
    images: [
      q7_1Image
    ],
    answers: [
      { 
        id: 'q7a1', 
        text: 'I usually want to understand first before taking another attempt. “Guys I fell, did anyone leave the button ? Let’s not do that next time.”', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 1, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q7a2', 
        text: 'I usually think of many possible solutions. “Since I already fell, let me try to see if I could go further down? How about I just stay here? Or maybe I try going up? Or maybe you guys try jumping down too?” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q7a3', 
        text: 'I usually try to test if a solution works. “Let me see if i can go up myself first, if I can’t we have to try something else.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q7a4', 
        text: 'I usually try to act fast. “I run around towards the destination directly, I try to come up myself after fall.”', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
    ]
  },
  {
    id: 'q8',
    text: 'When someone fell down, and everyone is back to the starting point, did you do/say any of the following? ',
    images: [
      q8_1Image,
    ],
    answers: [
      { 
        id: 'q8a1', 
        text: 'I’m not someone who settles with a rough sensing of how the solution works. “ guys our next plan is that whenever one person steps on the button, he or she does not move until someone else is safe.” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q8a2', 
        text: 'I’m not a draggy person. Just goes to one path and tries to go down again.', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q8a3', 
        text: 'I’m not someone who like to repeat old boring solutions. “Guys should we try something new? Maybe let’s all go one side? Maybe we draw a map? Maybe we write down the buttons this time?” ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q8a4', 
        text: 'I’m not a quick-to-act person without understanding the problem, details are important to me. “Guys are we supposed to split up the same way? What happened just now? Should we slow down and try to recap why she/he fell down? So we know what’s not working.” ', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 1, 
          IMPLEMENTER: 0 
        } 
      },
    ]
  },
  {
    id: 'q9',
    text: 'Which one best describes you? ',
    images: [
    ],
    answers: [
      { 
        id: 'q9a1', 
        text: 'I repeatedly fall down because I am the person who always runs too fast. ', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 2 
        } 
      },
      { 
        id: 'q9a2', 
        text: 'I would never/seldom fall down and I will carefully instruct my team members to slow down.', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 0, 
          DEVELOPER: 2, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q9a3', 
        text: 'I would never/seldom fall down and I will question when a person fell.', 
        points: { 
          CLARIFIER: 2, 
          IDEATOR: 0, 
          DEVELOPER: 0, 
          IMPLEMENTER: 0 
        } 
      },
      { 
        id: 'q9a4', 
        text: 'I fell down quite a few times and I think it’s completely ok, because I’m just exploring the possibilities.', 
        points: { 
          CLARIFIER: 0, 
          IDEATOR: 2, 
          DEVELOPER: 0, 
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
    color: '#808080', // Changed from blue to grey
    image: clariferImage,
    strengths: [
      'Enjoys exploring challenges and opportunities',
      'Likes to examine the details',
      'Wants a clear understanding of the issue',
      'Prefers a methodical approach to solving problems'],
    limitations: [
      'May suffer from "analysis paralysis"',
      'Takes no action without getting enough detailed information.',]

  },
  IDEATOR: {
    label: 'Ideator',
    description: 'These individuals excel at generating ideas and prefer brainstorming and thinking outside the box. They are imaginative and enjoy challenging the status quo.',
    color: '#8bc34a', // Changed from yellow to light green
    image: ideatorImage,
    strengths: [
      'Likes to look at the big picture',
      'Enjoys toying with ideas and possibilities',
      'Likes to stretch his or her imagination',
      'Enjoys thinking in more global and abstracts terms',
      'Takes an intuitive approach innovation'],
    limitations: [
      'May overlook details.',
      'May feel struggle with highly structured environment',
      ]
  },
  DEVELOPER: {
    label: 'Developer',
    description: 'These individuals prefer to design and develop solutions. They are analytical and like to test and refine ideas to ensure their feasibility.',
    color: '#03a9f4', // Changed from green to light blue
    image: developerImage,
    strengths: [
      'Enjoys putting together workable solutions',
      'Likes to examine the pluses and minuses of an idea',
      'Likes to compare competing solutions',
      'Enjoys analyzing potential solutions',
      'Enjoys planning steps to implement an idea'],
    limitations: [
      'May get stuck in developing the perfect solution',
      'Struggle when require swift action without time for comparing options',]
  },
  IMPLEMENTER: {
    label: 'Implementer',
    description: 'These individuals prefer to take action and implement solutions. They are practical, task-oriented, and like to see tangible results.',
    color: '#ffeb3b', // Changed from red to yellow
    image: implementerImage,
    strengths: [
      'Likes to see things happen',
      'Enjoys giving structure to ideas so they become a reality',
      'Takes the Nike approach: "Just Do It"',
      'Enjoys seeing ideas come to fruition',
      'Likes to focus on "workable" ideas and solutions'],
    limitations: [
      'May leap to action too quickly',
      'May struggle when adapt to changing plans',
    ]
  },
  
  INTEGRATOR: {
    label: 'Integrator',
    description: 'These individuals has a balanced profile across the four roles, able to shift between clarifying, ideating, developing, and implementing as needed. Such an individual would be adept at integrating the different stages of the problem-solving and innovation process.',
    color: '#9b59b6', // Purple
    image: integratorImage,
    strengths: [
      'While most people have high and low preferences, roughly 20% of FourSight respondents take a very even approach to the thinking process' ,
      'Those Integrators can be very flexible team players, easily accommodating whatever the task requires',
],
    limitations: [
      'May not have a fixed role to develop a specific area of expertise.',
    ]
  }
};
