
import { selector } from 'recoil';
import { questionListState, activeQuestionState, activeQuestionIdState } from './atoms'

export const questionListSelector = selector({
  key: 'questionListSelector',
  get: ({ get }) => {
    const questions = get(questionListState);
    return questions;
  },
});

export const activeQuestionIdSelector = selector({
  key: 'activeQuestionIdSelector',
  get: ({ get }) => {
    const id = get(activeQuestionIdState);
    return id;
  },
});

export const activeQuestionSelector = selector({
  key: 'activeQuestionSelector',
  get: ({ get }) => {
    return get(activeQuestionState);
  },
  set: ({ set, get }, newValue) => {
    const questions = get(questionListState);
    const updatedQuestions = questions.map(question =>
      question.id === newValue.id ? newValue : question
    );
    set(questionListState, updatedQuestions);
    set(activeQuestionState, newValue);
  },
});