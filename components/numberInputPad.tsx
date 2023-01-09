import { Button } from "react-bootstrap";
import styles from "../styles/NumberInput.module.scss";

export const NumberInputPad: React.FC<{
  getResult: (result: string | undefined) => any;
  currentValue: string | undefined;
}> = ({ getResult, currentValue }) => {
  const content = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    ".",
    "clear",
  ];
  const onClickHandler = (v: string) => () => {
    if (content[11] === v) {
      return getResult(undefined);
    }
    getResult(`${currentValue ?? ""}${v}`);
  };

  return (
    <div className={styles.number_input}>
      {content.map((v) => (
        <Button key={v} onClick={onClickHandler(v)}>
          {v === "clear" ? (
            <i className="bi bi-eraser" style={{ color: "#ddd" }}></i>
          ) : (
            v
          )}
        </Button>
      ))}
    </div>
  );
};
