import { _saveQuestionAnswer } from "../_DATA";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function mapQuestionToUser({ author, id }) {
  return {
    type: ADD_QUESTION_TO_USER,
    author,
    id,
  };
}

function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestionToUser(question) {
  return (dispatch) => dispatch(mapQuestionToUser(question));
}

export function addAnswerToQuestion(question, answer) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();
    const saveAnswer = {
      authedUser,
      qid: question.id,
      answer,
    };
    await _saveQuestionAnswer(saveAnswer);
    dispatch(answerQuestion(saveAnswer));
  };
}
