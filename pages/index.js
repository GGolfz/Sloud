import React, { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
import WordCloud from "../components/WordCloud";
let socket;
const Home = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isAns, setIsAns] = useState(false);
  const [result, setResult] = useState(null);
  useEffect(() => {
    socket = io();
    socket.emit("fetch-data");
    socket.emit("fetch-answer");
    socket.on("get-data", (data) => {
      setQuestion(data);
      setIsAns(false);
    });
    socket.on("get-answer", (d) => {
      setResult(d);
    });
    socket.on("clear", () => {
      setQuestion(null);
      setResult(null);
      setIsAns(false);
    });
  }, []);

  const handleAnswer = () => {
    if (question) {
      socket.emit("answer", {
        questionId: question.questionId,
        answer: answer.toLowerCase().trim(),
      });
      setIsAns(true);
    }
  };
  return (
    <Fragment>
      <div style={{ width: "100vw", height: "100vh", background: "#FAFAFA" }}>
        <h1
          style={{
            fontSize: "3em",
            textAlign: "center",
            margin: "0",
            padding: "1.5rem 0",
          }}
        >
          Sloud
        </h1>
        {question ? (
          <Fragment>
            <h2
              style={{
                fontSize: "2em",
                textAlign: "center",
                margin: "0",
                padding: "1rem 0",
              }}
            >
              {question?.questionName}
            </h2>
            {isAns ? (
              <Fragment>
                {result ? (
                  <Fragment>
                    <div
                      style={{
                        width: "100vw",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <WordCloud words={result} />
                    </div>
                  </Fragment>
                ) : null}
              </Fragment>
            ) : (
              <Fragment>
                <div
                  style={{
                    display: "flex",
                    width: "100vw",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="text"
                    value={answer}
                    style={{
                      fontSize: "1.5em",
                      padding: ".5em",
                      minWidth: "280px",
                      width: "50%",
                      border: "1px solid #E0E0E0",
                      borderRadius: "25px",
                    }}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <div
                    onClick={handleAnswer}
                    style={{
                      marginLeft: "1rem",
                      padding: ".5rem 2rem",
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "1.2em",
                      background: "#A880F7",
                      borderRadius: "25px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Submit
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <img src="no_data.svg" alt="nodata" />
              <br />
            </div>
            <h3 style={{ textAlign: "center" }}>No question available</h3>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
