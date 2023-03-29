var { _saveQuestion, _saveQuestionAnswer, _getUsers } = require("./_DATA");

describe("_saveQuestion", () => {
  it("will return true when question is saved", async () => {
    var result = await _saveQuestion({
      optionOneText: "do sit ups",
      optionTwoText: "do squats",
      author: "sarahedo",
    });
    expect(result.author).toEqual("sarahedo");
    expect(result.optionOne.text).toEqual("do sit ups");
    expect(result.optionTwo.text).toEqual("do squats");
  });

  it("will return error message when fails to save question", async () => {
    await expect(
      _saveQuestion({
        optionOneText: "",
        optionTwoText: "do squats",
        author: "sarahedo",
      })
    ).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("will return true when Answer to the question is saved", async () => {
    var question = {
      answer: "optionTwo",
      qid: "8xf0y6ziyjabvozdd253nd",
      authedUser: "mtsamis",
    };
    var result = await _saveQuestionAnswer(question);
    expect(result).toBeTruthy();
  });

  it("will return error message when Answer to question fails to save", async () => {
    await expect(_saveQuestionAnswer({})).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
