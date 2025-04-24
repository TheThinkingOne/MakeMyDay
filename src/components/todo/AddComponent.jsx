import React, { useState } from "react";
import ResultModal from "../common/ResultModal";
import { postAdd } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import useCustomLogin from "../../hooks/useCustomLogin";
import { showSuccess } from "../../util/toastUtil";

const initState = {
  title: "",
  dueDate: "",
  savePeriod: "",
  complete: false,
};

function AddComponent(props) {
  const [todo, setTodo] = useState({ ...initState }); // 상태코드

  const [result, setResult] = useState(null);

  const [error, setError] = useState(""); // 에러설정

  const { moveToList } = useCustomMove(); // 새 글이 등록되면 1페이지로 이동

  const { loginState } = useCustomLogin();

  // 변경에 대한 처리
  const handleChangeTodo = (e) => {
    // todo[title]

    // console.log(e.target.name, e.target.value);
    // todo[e.target.name] = e.target.value; // 직접 상태 수정하는 방식

    // setTodo({ ...todo });
    // // 문법이 익숙하지 않아 잘 모르겠군

    const { name, value } = e.target;
    setTodo((prev) => ({ ...prev, [name]: value }));
    // 기존 상태(prev)를 복사한 후 해당 필드만 새롭게 업데이트
    // 리액트에서 권장하는 패턴
  };

  const handleDateValidation = () => {
    // 사용자가 입력한 마감일이 오늘 이후인지 확인하는 메소드

    const selectedDate = new Date(todo.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  // const handleClicked = () => {
  //   //console.log(todo);
  //   postAdd(todo).then((result) => {
  //     // {TNO:104} // 이런 형태로 나올것임
  //     setResult(result.TNO);
  //     setTodo({ ...initState }); // 초기화
  //   }); // todo 전달
  // };

  const handleClicked = () => {
    if (!handleDateValidation()) {
      setError("마감일은 오늘 이후 날짜만 선택 가능합니다.");
      return;
    }

    if (!todo.savePeriod) {
      setError("보관기간을 선택해주세요.");
      return;
    }

    const newTodo = {
      ...todo,
      writer: loginState.userID,
    };

    postAdd(newTodo).then((res) => {
      setResult(res.tno);
      setTodo({ ...initState });
      setError("");
      showSuccess("일정이 등록되었습니다.");
    });
  };

  const closeModal = () => {
    setResult(null); // 모달창 안나오게하기
    moveToList(); // 파라미터 없으면 1페이지로 이동하게 됨
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">일정 내용</div>
          <input
            className="w-4/5 p-6 rounded-r border border-neutral-500 shadow-md"
            name="title"
            type="text"
            value={todo.title}
            onChange={handleChangeTodo}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">마감일</div>
          <input
            className="w-4/5 p-6 rounded-r border border-neutral-500 shadow-md"
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChangeTodo}
            min={new Date().toISOString().split("T")[0]}
            // 오늘 날짜부터만 선택 가능
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">보관 기간</div>
          <select
            name="savePeriod"
            className="w-4/5 p-6 rounded border border-neutral-500 shadow-md"
            value={todo.savePeriod}
            onChange={handleChangeTodo}
          >
            <option value="" disabled selected>
              -- 보관기간을 선택하세요 --
            </option>
            <option value="ONE_DAY">하루</option>
            <option value="ONE_WEEK">일주일</option>
            <option value="PERMANENT">영구보관</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="text-red-600 font-bold text-center mb-4">{error}</div>
      )}

      <div className="flex justify-end">
        <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
          <button
            type="button"
            onClick={handleClicked}
            className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
          >
            등록
          </button>
        </div>
      </div>

      {result && (
        <ResultModal
          title={"등록 완료"}
          content={`일정 번호 ${result}가 등록되었습니다.`}
          callbackFn={closeModal}
        />
      )}
    </div>
  );
}

export default AddComponent;
