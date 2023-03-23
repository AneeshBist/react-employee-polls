import { connect } from "react-redux";
import { useRef, useState } from "react";
import { addAnswerToQuestion } from "../actions/users";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
const QuestionAnswer = ({
  dispatch,
  question,
  creator,
  answered,
  totalUsers,
}) => {
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  const [isPending, setIsPending] = useState(answered === null ? true : false);
  const [errorMsg, setErrorMsg] = useState("");

  let totalAnswered =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  let percentageAnswered = (totalAnswered / totalUsers) * 100;

  const handleAnswer = (e) => {
    e.preventDefault();
    if (inputRef1.current.checked || inputRef2.current.checked) {
      const answer = inputRef1.current.checked
        ? inputRef1.current.value
        : inputRef2.current.value;
      dispatch(addAnswerToQuestion(question, answer));
      setIsPending(false);
    } else setErrorMsg("Please make a selection before submitting");
  };

  return (
    <div>
      <Nav />
      <div className=" pg-title mt-3 p-2 bg-light  rounded">
        <h2>Poll</h2>
      </div>
      <div className="poll-creator spc-mrg">
        <img
          src={`../images/${creator.id}.png`}
          className="avatar-img rounded-pill"
          alt="user icons"
        />
        <div>
          <i>Created by:</i>
          <b style={{ color: "green" }}>&nbsp;&nbsp;{creator.id}</b>
        </div>
      </div>

      <form className="container mt-3" onSubmit={handleAnswer}>
         
        <table className="table">
          <tbody>
            <tr>
              <td colSpan="4">
                <h5>
                  <i>would you rather ?</i>
                </h5>
              </td>
            </tr>
            <tr>
              <td>
                <b>optionOne</b>
              </td>
              <td>
                <input
                  type="radio"
                  id="optionRadio"
                  name="answerSelector"
                  value="optionOne"
                  ref={inputRef1}
                  disabled={!isPending}
                />
              </td>
              <td className="td-question">{question.optionOne.text}</td>
              <td>
                <i style={{ color: "green" }}>
                  Total Votes: {question.optionOne.votes.length}
                </i>
              </td>
            </tr>
            <tr>
              <td>
                <b>optionTwo</b>
              </td>
              <td>
                <input
                  type="radio"
                  id="optionRadio"
                  name="answerSelector"
                  value="optionTwo"
                  ref={inputRef2}
                  disabled={!isPending}
                />
              </td>
              <td className="td-question">{question.optionTwo.text}</td>
              <td>
                <i style={{ color: "green" }}>
                  Total Votes: {question.optionTwo.votes.length}
                </i>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" className="btn btn-success" disabled={!isPending}>
          Submit
        </button>
        <div className="spc-mrg">
          <div className="progress">
            <div
              className="progress-bar bg-success"
              style={{ width: `${percentageAnswered}%` }}
            >
              {percentageAnswered}%
            </div>
          </div>
          <i>{percentageAnswered}% </i> of users have answered this poll.
          <br />
          Total Users Answered:&nbsp;&nbsp;&nbsp;<i>{totalAnswered}</i>
        </div>
        {errorMsg !== "" ? (
          <i style={{ color: "red" }}>{errorMsg}</i>
        ) : isPending === null ? null : (
          <p>
            your answer: <b style={{ color: "green" }}>{answered}</b>
          </p>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  const creator = users[question.author];
  return {
    creator: creator,
    question,
    totalUsers: Object.keys(users).length,
    answered: users[authedUser].answers[id]
      ? users[authedUser].answers[id]
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionAnswer));
