import React, { useState, useEffect } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno: 0,
  title: "",
  dueDate: "",
  savePeriod: "ONE_DAY",
  complete: false,
};

function ModifyComponent({ tno }) {
  const [todo, setTodo] = useState(initState);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const { moveToRead, moveToList } = useCustomMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: name === "complete" ? value === "Y" : value,
    }));
  };

  const handleClickModify = () => {
    if (!validateDate()) {
      setError("마감일은 오늘 이후만 가능합니다.");
      return;
    }
    putOne(todo).then(() => setResult("수정 완료"));
  };

  const handleClickDelete = () => {
    deleteOne(tno).then(() => setResult("삭제 완료"));
  };

  const validateDate = () => {
    const selectedDate = new Date(todo.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const closeModal = () => {
    if (result === "삭제 완료") {
      moveToList();
    } else {
      moveToRead(tno);
    }
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <Field label="번호" value={todo.tno} readOnly />
      <EditableField
        label="일정 내용"
        name="title"
        value={todo.title}
        onChange={handleChange}
      />
      <EditableField
        label="마감일"
        name="dueDate"
        type="date"
        value={todo.dueDate}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
      />
      <SelectField
        label="보관 기간"
        name="savePeriod"
        value={todo.savePeriod}
        options={[
          { value: "ONE_DAY", label: "하루" },
          { value: "ONE_WEEK", label: "일주일" },
          { value: "PERMANENT", label: "영구보관" },
        ]}
        onChange={handleChange}
      />
      <SelectField
        label="상태"
        name="complete"
        value={todo.complete ? "Y" : "N"}
        options={[
          { value: "Y", label: "완료됨" },
          { value: "N", label: "진행중" },
        ]}
        onChange={handleChange}
      />
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="flex justify-end p-4">
        <button
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={handleClickDelete}
        >
          삭제
        </button>
        <button
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={handleClickModify}
        >
          수정
        </button>
      </div>

      {result && (
        <ResultModal
          title={"처리결과"}
          content={result}
          callbackFn={closeModal}
        />
      )}
    </div>
  );
}

// 공통 컴포넌트로 필드 구성
const Field = ({ label, value, readOnly }) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{label}</div>
      <div
        className={`w-4/5 p-6 rounded border shadow-md ${
          readOnly ? "bg-gray-100" : ""
        }`}
      >
        {value}
      </div>
    </div>
  </div>
);

const EditableField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  min,
}) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{label}</div>
      <input
        className="w-4/5 p-6 rounded border border-neutral-300 shadow-md"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
      />
    </div>
  </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{label}</div>
      <select
        name={name}
        className="w-4/5 p-6 rounded border border-neutral-300 shadow-md"
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ModifyComponent;
