import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  tno: 0,
  title: "",
  dueDate: "",
  complete: false,
  savePeriod: "",
};

// React의 컴포넌트는 상태가 변경되면 자동으로 렌더링된다
//

function ReadComponent({ tno }) {
  const [todo, setTodo] = useState(initState);

  const [loading, setLoading] = useState(true);

  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
      setLoading(false);
    });

    // 기동기 호출 막기
    // 번호가 바뀌어 상태가 바뀌면 다시 랜더링 되게 한다?
    // 무한 호출 방지?
  }, [tno]);

  if (loading) {
    return <div className="text-center text-xl mt-10">로딩 중...</div>;
  }

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <Field label="번호" value={todo.tno} />
      <Field label="제목" value={todo.title} />
      <Field label="마감일" value={todo.dueDate} />
      <Field
        label="상태"
        value={todo.complete ? "완료" : "미완료"}
        highlight={todo.complete ? "green" : "red"}
      />
      <Field label="보관 기간" value={translateSavePeriod(todo.savePeriod)} />

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          목록
        </button>

        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-yellow-500"
          onClick={() => moveToModify(todo.tno)}
        >
          수정
        </button>
      </div>
    </div>
  );
}

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

// ✅ 공통 출력용 컴포넌트
const Field = ({ label, value, highlight }) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{label}</div>
      <div
        className={`w-4/5 p-6 rounded-r border border-solid shadow-md ${
          highlight ? `text-${highlight}-600 font-bold` : ""
        }`}
      >
        {value}
      </div>
    </div>
  </div>
);

// 보관기간 한글 변환 함수(앞에 Add컴포넌트꺼랑 동일)
const translateSavePeriod = (period) => {
  switch (period) {
    case "ONE_DAY":
      return "하루";
    case "ONE_WEEK":
      return "일주일";
    case "PERMANENT":
      return "영구보관";
    default:
      return "미지정";
  }
};

export default ReadComponent;
