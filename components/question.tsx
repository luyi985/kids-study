import { MathQuestion } from "@/core/mathQuestion";
import React, { useRef, useState } from "react";
import { CanvasDrawPanel } from "@/components/canvasDrawPanel";

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
  const isLast = currentIdx === questionList.length - 1;
  const hasAnswer = Boolean(questionList[currentIdx].answer);
  const disablePrev = currentIdx === 0;
  const disableNext = isLast || !hasAnswer;
  return (
    <div className="container">
      <div className="row">
        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={handleNextPrev(false)}
            disabled={disablePrev}
          >
            Previous
          </button>

          <button
            className="btn btn-primary"
            onClick={handleNextPrev(true)}
            disabled={disableNext}
          >
            next
          </button>

          <button
            disabled={!isLast}
            className="btn btn-primary"
            onClick={() => setToggleScore((pre) => !pre)}
          >
            Show Score
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="progress" role="progressbar">
            <div className="progress-bar" style={{ width: `${complete}` }}>
              {`${currentIdx + 1}`}
            </div>
          </div>
        </div>
      </div>
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
      <div className="row">
        <div className="col-12" style={questionStyle}>
          <h1>{`${questionList[currentIdx].question} = ?`}</h1>
        </div>
        <div className="col-12 text-center">
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
        <CanvasDrawPanel handleSubmit={() => {}} />
      </div>
    </div>
  );
};
