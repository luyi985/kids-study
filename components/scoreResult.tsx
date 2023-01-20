import { useState } from "react";
import { Container, Row, Modal, Button } from "react-bootstrap";
import { QuestionMeta } from "./mathHook";
import { DayQuestion, MathCalcType } from "./types";

const getTimeDiff = (
  start: string,
  end: string
): undefined | { minutes: number; seconds: number } => {
  try {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    if (isNaN(diff)) throw Error("Failed to get diff");
    const totalSeconds = diff / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = parseFloat((totalSeconds % 60).toFixed(2));
    return { minutes, seconds };
  } catch (e) {
    return undefined;
  }
};

export const ScoreResult: React.FC<
  {
    questions: Array<DayQuestion>;
    day: number;
    type: MathCalcType;
  } & QuestionMeta
> = ({ questions, day, type, start, end, status }) => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const correctCount = questions.filter(
    (q) => Number(q.result).toFixed(2) === Number(q.answer ?? "").toFixed(2)
  ).length;

  const diff = getTimeDiff(start, end);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{`Score Details Of Day ${day}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <p>
              <span>{`Status: `}</span>
              <strong> {status}</strong>
            </p>
          </Row>
          <Row>
            <p>
              <span>{`Math Type: `}</span>
              <strong>{type}</strong>
            </p>
          </Row>
          <Row>
            <p>
              <span>{`Score: `}</span>
              <strong>{`${((correctCount * 100) / questions.length).toFixed(
                2
              )} (${correctCount}/${questions.length})`}</strong>
            </p>
          </Row>
          {Boolean(diff) && (
            <Row>
              <p>
                <span>{`Use Time: `}</span>
                <strong>{`${diff?.minutes} minutes ${diff?.seconds} seconds`}</strong>
              </p>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};
