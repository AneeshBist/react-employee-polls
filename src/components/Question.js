import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../helper";

const Question = ({ dispatch, question }) => {
  const navigate = useNavigate();
  const id = question.id;
  const getTime = formatDate(question.timestamp);
  const questionNav = () => {
    navigate(`/questions/${id}`);
  };
  return (
    <div className="db-question spc-mrg">
      <i>Poll by:</i>
      <b>&nbsp;&nbsp;{question.author}</b>
      <p>{getTime}</p>
      <button className="btn btn-outline-secondary" onClick={questionNav}>
        View
      </button>
    </div>
  );
};

const mapStateToProps = ({ questions }, { id }) => {
  return { question: questions[id] };
};

export default connect(mapStateToProps)(Question);
