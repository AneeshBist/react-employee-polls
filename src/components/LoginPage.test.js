import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import LoginPage from "./LoginPage";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("LoginPage", () => {
  it("passes when rendering the LoginPage component is a success", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
  it("Login page shows error message when username and password are provided before submit", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    var input1 = component.getByTestId("txt-usr");
    fireEvent.change(input1, { target: { value: "" } });
    var input2 = component.getByTestId("txt-pwd");
    fireEvent.change(input2, { target: { value: "" } });
    var submitButton = component.getByTestId("btn-login");
    fireEvent.click(submitButton);

    const errorMessage = component.getByText(
      "*Error: Kindly provide both: username & password for login."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
