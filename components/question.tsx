import { MathQuestion } from "@/core/mathQuestion";
import React, { useRef, useState } from "react";

const questionStyle = {
  padding: "20px",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

const ResultCell = ({
  idx,
  question,
  pickQuestion,
}: {
  idx: number;
  question: MathQuestion & { answer?: number };
  pickQuestion: (idx: number) => void;
}) => {
  return (
    <span
      style={{
        color: "white",
        display: "flex",
        width: "40px",
        height: "40px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        background: `${
          typeof question.answer === "undefined"
            ? "#ddd"
            : question.answer === parseFloat(question.result)
            ? "green"
            : "red"
        }`,
      }}
      onClick={() => pickQuestion(idx)}
    >
      {idx + 1}
    </span>
  );
};

export const Questions: React.FC<{ questions: MathQuestion[] }> = ({
  questions,
}) => {
  const [questionList, setQuestionList] =
    useState<Array<MathQuestion & { answer?: number }>>(questions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [toggleScore, setToggleScore] = useState(false);
  const handleNextPrev = (isNext: boolean) => () => {
    const nextStateIdx = isNext
      ? Math.min(currentIdx + 1, questionList.length - 1)
      : Math.max(currentIdx - 1, 0);
    setCurrentIdx(nextStateIdx);
  };
  const complete = `${((currentIdx * 100) / (questionList.length - 1)).toFixed(
    2
  )}%`;

  return (
    <>
      <div className="carousel slide carousel-fade carousel-dark">
        <div className="carousel-inner">
          {questionList.map((q, idx) => (
            <div
              className={
                currentIdx === idx ? "carousel-item active" : "carousel-item"
              }
              style={questionStyle}
              key={idx}
            >
              <div className="row">
                <h2>{`${q.question} = ?`}</h2>
                <input
                  type="number"
                  value={questionList[currentIdx].answer ?? ""}
                  onChange={(e) => {
                    const clone = questionList.slice();
                    clone[currentIdx].answer = parseFloat(
                      parseFloat(e.target.value ?? "").toFixed()
                    );
                    setQuestionList(clone);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {currentIdx !== 0 && (
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-slide="prev"
            onClick={handleNextPrev(false)}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
        )}
        {currentIdx !== questionList.length - 1 && (
          <button
            className="carousel-control-next"
            type="button"
            data-bs-slide="next"
            onClick={handleNextPrev(true)}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        )}
        <div className="progress" role="progressbar">
          <div className="progress-bar" style={{ width: `${complete}` }}>
            {`${currentIdx + 1}`}
          </div>
        </div>
        <br />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => setToggleScore((pre) => !pre)}
      >
        Show Score
      </button>
      {toggleScore && (
        <div className="row">
          <div
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              width: "100%",
              display: "flex",
              gap: "2px",
            }}
          >
            {questionList.map((q, idx) => (
              <ResultCell
                idx={idx}
                key={idx}
                question={q}
                pickQuestion={setCurrentIdx}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
