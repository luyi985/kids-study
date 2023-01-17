import { NavLink } from "@/components/nav";
import { makeStaticPracticePath } from "./nav";
import styles from "../styles/List.module.scss";
import { MathCalcType } from "@/core/mathQuestion";
import { useGetDaysState } from "./mathHook";

export const MathDayList: React.FC<{
  baseUrl: string;
  total: number;
  type: MathCalcType;
}> = ({ baseUrl, total, type }) => {
  const { dayStatus } = useGetDaysState(type);

  return (
    <ul className={styles.number_list}>
      {makeStaticPracticePath(baseUrl, total).map((props) => {
        const state = dayStatus?.[props.day] ?? "";
        return (
          <li
            key={props.key}
            className={`${styles.number_list_cell} ${state} col-2`}
          >
            <NavLink {...props} />
          </li>
        );
      })}
    </ul>
  );
};
