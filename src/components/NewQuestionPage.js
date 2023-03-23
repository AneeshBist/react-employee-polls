import { useRef, useState } from "react";
import { connect } from "react-redux";
import { addNewQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const NewQuestionPage = ({ dispatch, author }) => {
  const optionRef1 = useRef();
  const optionRef2 = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleNewQuestion = (e) => {
    e.preventDefault();
    if (optionRef1.current.value && optionRef2.current.value) {
      const question = {
        optionOneText: optionRef1.current.value,
        optionTwoText: optionRef2.current.value,
        author,
      };
      dispatch(addNewQuestion(question));
      optionRef1.current.value = "";
      optionRef2.current.value = "";
      navigate("/dashboard");
    } else {
      setErrorMessage("*Kindly Enter both options before submitting.");
    }
  };

  return (
    <div>
      <Nav />
      <div className=" pg-title mt-3 p-2 bg-light  rounded">
        <h2>Create New Poll</h2>
      </div>
      <div className="spc-mrg">
        <h5>
          <i>Would you Rather ?</i>
        </h5>
      </div>
      <form onSubmit={handleNewQuestion}>
        <div className="nb-3">
          <label className="form-label" data-testid="test-lbl1">
            optionOne
          </label>
          <input
            className="form-control"
            name="optionOneText"
            ref={optionRef2}
            placeholder="First Option here ..."
            type="text"
            data-testid="test-inp1"
          />
        </div>
        <div className="nb-3">
          <label data-testid="test-lbl2" className="form-label">
            optionTwo
          </label>
          <input
            className="form-control"
            name="optionTwoText"
            ref={optionRef1}
            placeholder="Second Option here ..."
            type="text"
            data-testid="test-inp2"
          />
        </div>
        <br />
        <button
          type="submit"
          data-testid="test-btn"
          className="btn btn-success"
        >
          Submit
        </button>
        {errorMessage && (
          <div>
            <i style={{ color: "red" }}>{errorMessage}</i>
          </div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    author: authedUser,
  };
};
export default connect(mapStateToProps)(NewQuestionPage);
