import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  it("passes when rendering the App component is a success", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("this checks the components of Login screen which is shown first when user starts app", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const pageTitle = component.getByText("Welcome to Employee Polls");
    expect(pageTitle).toBeInTheDocument();

    var usernameInput = component.getByTestId("username");
    var passwordInput = component.getByTestId("password");
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    var submitButton = component.getByText("Login");
    expect(submitButton).toBeInTheDocument();
  });
});
