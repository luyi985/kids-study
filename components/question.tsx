import React, { useRef } from "react";
import { CanvasDrawPanel } from "@/components/canvasDrawPanel";
import { NumberInputPad } from "@/components/numberInputPad";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  ProgressBar,
  Row,
} from "react-bootstrap";
import {
  useGetDetailsOfIncompleteDay,
  useSetDayRecord,
  MATH_DAY_STATUS,
} from "@/components/mathHook";
import { DayQuestion, MathCalcType } from "./types";
import { ScoreResult } from "@/components/scoreResult";
import { Daddy } from "@/components/daddy";

const questionStyle = {
  padding: "20px",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  fontSize: "40px",
  textAlign: "center",
  flexWrap: "wrap",
  alignItems: "center",
};

const ResultCellWrap: React.FC<{
  children: React.ReactNode[] | React.ReactNode;
}> = ({ children }) => (
  <div
    style={{
      flexWrap: "wrap",
      flexDirection: "row",
      width: "100%",
      display: "flex",
      gap: "2px",
    }}
  >
    {children}
  </div>
);
const ResultCell = ({
  idx,
  question,
  pickQuestion,
}: {
  idx: number;
  question: DayQuestion;
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
            : parseFloat(question.answer) === parseFloat(question.result)
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

export const Questions: React.FC<{
  questions: Array<DayQuestion>;
  day: number;
  type: MathCalcType;
}> = ({ questions, day, type }) => {
  const {
    setQuestionList,
    questionList,
    currentIdx,
    setCurrentIdx,
    meta,
    refetch,
  } = useGetDetailsOfIncompleteDay({
    questionList: questions,
    type,
    day,
  });

  const handleNextPrev = (isNext: boolean) => async () => {
    const nextStateIdx = isNext
      ? Math.min(currentIdx + 1, questionList.length - 1)
      : Math.max(currentIdx - 1, 0);
    await setCurrentIdx(nextStateIdx);
    if (isComplete) return;
    await setDayRecord();
  };
  const handleAnswerChange = (v: string | undefined) => {
    const clone = questionList.slice();
    clone[currentIdx].answer = v;
    setQuestionList(clone);
  };
  const { setDayRecord } = useSetDayRecord(day, type, questionList);
  const complete = (currentIdx * 100) / (questionList.length - 1);
  const isLast = currentIdx === questionList.length - 1;
  const hasAnswer = Boolean(questionList?.[currentIdx]?.answer);
  const disablePrev = currentIdx === 0;
  const disableNext = isLast || !hasAnswer;
  const isProgressLast = isLast && hasAnswer;
  const isComplete = meta.status === MATH_DAY_STATUS.complete;
  const daddyRef = useRef(null);
  return (
    <Container>
      {isComplete && (
        <ScoreResult {...{ day, questions: questionList, type, ...meta }} />
      )}
      <Row className="mb-2">
        <ButtonGroup>
          <Button onClick={handleNextPrev(false)} disabled={disablePrev}>
            <i className="bi bi-chevron-compact-left"></i>
          </Button>
          {isProgressLast && !isComplete && (
            <Button
              disabled={!isLast}
              variant={isLast ? "success" : "primary"}
              onClick={async () => {
                (daddyRef.current as any)?.play();
                (daddyRef.current as any).muted = false;
                await setDayRecord();
                refetch();
              }}
            >
              Show Result
            </Button>
          )}
          <Button onClick={handleNextPrev(true)} disabled={disableNext}>
            <i className="bi bi-chevron-compact-right"></i>
          </Button>
        </ButtonGroup>
      </Row>
      {!isComplete && (
        <Row>
          <Col span={12}>
            <ProgressBar
              striped={isProgressLast ? false : true}
              animated={isProgressLast ? false : true}
              variant={isProgressLast ? "success" : "info"}
              now={complete}
              label={`${currentIdx + 1}/${questionList.length}`}
            />
          </Col>
        </Row>
      )}
      {isComplete && (
        <Row className="mt-2">
          <ResultCellWrap>
            {questionList.map((q, idx) => (
              <ResultCell
                idx={idx}
                key={idx}
                question={q}
                pickQuestion={setCurrentIdx}
              />
            ))}
          </ResultCellWrap>
        </Row>
      )}
      <Row style={{ alignItems: "flex-start" }}>
        <div
          className="col-12"
          // @ts-ignore
          style={questionStyle}
        >
          <h1
            style={{
              fontWeight: "bolder",
              whiteSpace: "nowrap",
              fontSize: "inherit",
            }}
          >{`${questionList[currentIdx].question} = ${
            questionList?.[currentIdx]?.answer ?? ""
          }`}</h1>
        </div>
        <Col
          style={{ justifyContent: "center", display: "flex" }}
          xs={12}
          md={6}
        >
          <NumberInputPad
            getResult={handleAnswerChange}
            currentValue={questionList[currentIdx].answer}
          />
        </Col>
        <Col xs={12} md={6}>
          <CanvasDrawPanel handleSubmit={() => {}} />
        </Col>
      </Row>
      <Daddy ref={daddyRef} />
    </Container>
  );
};
