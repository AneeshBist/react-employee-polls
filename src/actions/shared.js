import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { _getUsers, _getQuestions } from "../_DATA";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
    dispatch(hideLoading());
  };
}
