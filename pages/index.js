import React, { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
let socket;
const Home = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isAns, setIsAns] = useState(false);
  useEffect(() => {
    socket = io();
    socket.emit("fetch-data");
    socket.on("get-data", (data) => {
      setQuestion(data);
      console.log(data);
    });
    socket.on("clear", () => {
      setQuestion(null);
    });
  }, []);
  const handleAnswer = () => {
    if (question) {
      socket.emit("answer", {
        questionId: question.questionId,
        answer: answer.toLowerCase().trim(),
      });
      setIsAns(true)
    }
  };
  return (
    <Fragment>
      {question && !isAns ? (
        <div>
          <div>{question.questionName}</div>
          <div>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={handleAnswer}>submit</button>
          </div>
        </div>
      ) : (
        <div>No data now :(</div>
      )}
    </Fragment>
  );
};

export default Home;
