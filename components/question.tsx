import { MathQuestion } from "@/core/mathQuestion";
import React, { useRef, useState } from "react";
import { CanvasDrawPanel } from "@/components/canvasDrawPanel";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";

const questionStyle = {
  padding: "20px",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  fontSize: "35px",
  textAlign: "center",
  flexWrap: "wrap",
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
  const handleAnswerChange = (e: any) => {
    const clone = questionList.slice();
    clone[currentIdx].answer = parseFloat(
      parseFloat(e.target.value ?? "").toFixed()
    );
    setQuestionList(clone);
  };
  const complete = (currentIdx * 100) / (questionList.length - 1);
  const isLast = currentIdx === questionList.length - 1;
  const hasAnswer = Boolean(questionList[currentIdx].answer);
  const disablePrev = currentIdx === 0;
  const disableNext = isLast || !hasAnswer;
  return (
    <Container>
      <Row className="mb-2">
        <ButtonGroup>
          <Button onClick={handleNextPrev(false)} disabled={disablePrev}>
            <i className="bi bi-chevron-compact-left"></i>
          </Button>
          <Button
            disabled={!isLast}
            variant={isLast ? "success" : "primary"}
            onClick={() => setToggleScore((pre) => !pre)}
          >
            Show Score
          </Button>
          <Button onClick={handleNextPrev(true)} disabled={disableNext}>
            <i className="bi bi-chevron-compact-right"></i>
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Col span={12}>
          <ProgressBar
            striped={isLast ? false : true}
            animated={isLast ? false : true}
            variant={isLast ? "success" : "info"}
            now={complete}
            label={`${currentIdx + 1}/${questionList.length}`}
          />
        </Col>
      </Row>
      {toggleScore && (
        <Row>
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
        </Row>
      )}
      <Row>
        <div
          className="col-12"
          // @ts-ignore
          style={questionStyle}
        >
          <Col>
            <h1
              style={{
                fontSize: "50px",
                fontWeight: "bolder",
                whiteSpace: "nowrap",
              }}
            >{`${questionList[currentIdx].question} =`}</h1>
          </Col>
          <Col>
            <input
              maxLength={6}
              type="number"
              value={questionList[currentIdx].answer ?? ""}
              onChange={handleAnswerChange}
            />
          </Col>
        </div>

        <CanvasDrawPanel handleSubmit={() => {}} />
      </Row>
    </Container>
  );
};
