// src/state.js
import { atom } from 'recoil';

export const questionListState = atom({
  key: 'questionListState', 
  default: [
    {
      id: 'intro',
    question: 'what do you think of our application so far?',
    option: null
    }
  ],
});

export const activeQuestionState = atom({
  key: 'activeQuestionState',
  default: null,
});

export const activeQuestionIdState = atom({
  key: 'activeQuestionIdState',
  default: null,
});