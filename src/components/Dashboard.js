import { connect } from "react-redux";
import { useState } from "react";
import Question from "./Question";
import Nav from "./Nav";

const Dashboard = (props) => {
  let solved = [];
  let pending = [];
  let [showPending, setShowPending] = useState(true);

  props.questionIds.map((id) =>
    props.userAnswered.includes(id) ? solved.push(id) : pending.push(id)
  );

  const handleToggle = (e) => {
    setShowPending(!showPending);
  };

  return (
    <div>
      <Nav />
      <div className=" pg-title mt-3 p-2 bg-light  rounded">
        <h2>Dashboard</h2>
      </div>

      <div>
        <img
          src={`./images/${props.authedUser}.png`}
          className="avatar-img rounded-pill"
          alt="user icons"
        />
        <span>
          <b>{props.users[props.authedUser].name}</b>
        </span>
      </div>

      <div className="spc-mrg">
        {showPending ? (
          <button className="btn btn-success" onClick={handleToggle}>
            click to show Answered
          </button>
        ) : (
          <button className="btn btn-warning" onClick={handleToggle}>
            click to show Pending
          </button>
        )}
      </div>
      <div className="row">
        {showPending ? (
          <div className="col db-col spc-mrg db-pen">
            <div className="db-col-title spc-mrg db-col-title-pen">
              <h4>Pending</h4>
            </div>

            {pending.map((id) => (
              <Question key={id} id={id} isSolved="false" />
            ))}
          </div>
        ) : (
          <div className="col db-col spc-mrg db-ans">
            <div className="db-col-title spc-mrg db-col-title-ans">
              <h4>Answered</h4>
            </div>
            {solved.map((id) => (
              <Question id={id} key={id} isSolved="true" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser, users }) => {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    questions,
    authedUser,
    users,
    userAnswered: Object.keys(users[authedUser].answers),
  };
};

export default connect(mapStateToProps)(Dashboard);
