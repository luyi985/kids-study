import { SuperContext } from "@/components/common/superContext";
import { MathQuestion, MathCalcType } from "@/core/mathQuestion";
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

enum MATH_DAY_STATUS {
  incomplete = "incomplete",
  complete = "complete",
}

export const useSetDayRecord = (
  day: number,
  type: MathCalcType,
  details: any[]
) => {
  const { superBase, user } = useContext(SuperContext);

  const setDayRecord = useCallback(async () => {
    if (!user?.id) return;
    const status_arg = details.every((d) => !isNaN(Number(d.answer)))
      ? MATH_DAY_STATUS.complete
      : MATH_DAY_STATUS.incomplete;

    await superBase?.rpc("upsert_math_day_record", {
      status_arg,
      day_arg: day,
      type_arg: type,
      user_id_arg: user.id,
      details_arg: details,
    });
  }, [day, details, superBase, type, user?.id]);

  return { setDayRecord };
};

export const useGetDetailsOfIncompleteDay: (args: {
  day: number;
  type: MathCalcType;
  questionList: Array<MathQuestion & { answer?: string }>;
}) => {
  questionList: Array<MathQuestion & { answer?: string }>;
  setQuestionList: (q: Array<MathQuestion & { answer?: string }>) => void;
  setCurrentIdx: (idx: number) => void;
  currentIdx: number;
} = ({ questionList: originalQuestionList, day, type }) => {
  const { user, superBase } = useContext(SuperContext);
  const [questionList, setQuestionList] =
    useState<Array<MathQuestion & { answer?: string }>>(originalQuestionList);
  const [currentIdx, setCurrentIdx] = useState(0);
  const hasRendered = useRef(false);
  useEffect(() => {
    if (!superBase || !user?.id) return;
    hasRendered.current = true;
    superBase
      .rpc("get_math_day_record", {
        day_arg: day,
        type_arg: type,
        user_id_arg: user?.id,
      })
      .then((result) => {
        const resultQuestionList =
          result.data?.[0]?.details ?? originalQuestionList;
        setQuestionList(resultQuestionList);
        const lastIndex = resultQuestionList.findIndex(
          (q: any) => !Boolean(q.answer)
        );
        setCurrentIdx(lastIndex < 0 ? questionList.length - 1 : lastIndex);
      });
  }, [
    superBase,
    day,
    user?.id,
    type,
    questionList.length,
    originalQuestionList,
  ]);

  return {
    questionList,
    setQuestionList,
    setCurrentIdx,
    currentIdx,
  };
};
