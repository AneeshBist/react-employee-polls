import { _saveQuestion } from "../_DATA";
import { addQuestionToUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function addNewQuestion(question) {
  return async (dispatch) => {
    const question_1 = await _saveQuestion(question);
    dispatch(addQuestion(question_1));
    dispatch(addQuestionToUser(question_1));
  };
}
