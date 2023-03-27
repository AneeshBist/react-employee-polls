import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NewQuestionPage from "./components/NewQuestionPage";
import QuestionAnswer from "./components/QuestionAnswer";
import Leaderboard from "./components/Leaderboard";
import LoginPage from "./components/LoginPage";
import ErrorPage from "./components/ErrorPage";
import RedirectPages from "./RedirectPages";
import Page404 from "./components/Page404";
import { handleInitialData } from "./actions/shared";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  });

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/" element={<RedirectPages />}>
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/leaderboard" exact element={<Leaderboard />} />
            <Route path="/add" exact element={<NewQuestionPage />} />
            <Route path="/questions/:id" exact element={<QuestionAnswer />} />
            <Route path="/page404" element={<Page404 />} />
          </Route>
          <Route path="*" exact element={<ErrorPage />} />
        </Routes>
      </div>
    </Fragment>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
