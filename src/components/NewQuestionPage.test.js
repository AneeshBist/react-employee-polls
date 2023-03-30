import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import NewQuestionPage from "./NewQuestionPage";
import { store } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("NewQuestionPage", () => {
  it("passes when rendering the NewQuestionPage component is a success", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestionPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("passes when both option one and two values are provided in New Questions Page", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestionPage />
        </BrowserRouter>
      </Provider>
    );

    const optionOneLabel = component.getByTestId("test-lbl1");
    expect(optionOneLabel.textContent).toBe("optionOne");
    const optionOneInput = component.getByTestId("test-inp1");
    fireEvent.change(optionOneInput, { target: { value: "sit ups" } });
    expect(optionOneInput.value).toBe("sit ups");

    const optionTwoLabel = component.getByTestId("test-lbl2");
    expect(optionTwoLabel.textContent).toBe("optionTwo");
    const optionTwoInput = component.getByTestId("test-inp2");
    fireEvent.change(optionTwoInput, { target: { value: "squats" } });
    expect(optionTwoInput.value).toBe("squats");

    const buttonSubmit = component.getByTestId("test-btn");
    expect(buttonSubmit.textContent).toBe("Submit");
  });

  it("displays error when both option one and two values are not provided in New Questions Page", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestionPage />
        </BrowserRouter>
      </Provider>
    );

    const optionOneInput = component.getByTestId("test-inp1");
    fireEvent.change(optionOneInput, { target: { value: null } });
    const optionTwoInput = component.getByTestId("test-inp2");
    fireEvent.change(optionTwoInput, { target: { value: "squats" } });

    const buttonSubmit = component.getByTestId("test-btn");
    fireEvent.click(buttonSubmit);

    const errorMessage = component.getByText(
      "*Kindly Enter both options before submitting."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
