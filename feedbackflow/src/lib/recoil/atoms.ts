// src/state.js
import { atom } from 'recoil';

export const questionListState = atom({
  key: 'questionListState', 
  default: [],
});

export const activeQuestionState = atom({
  key: 'activeQuestionState',
  default: null,
});

export const activeQuestionIdState = atom({
  key: 'activeQuestionIdState',
  default: null,
});