import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModifyComponent from "../../components/todo/ModifyComponent";

const ModifyPage = () => {
  const { tno } = useParams();
  // ajax 프리플라이트란?

  // const navigate = useNavigate();

  // const moveToRead = () => {
  //   navigate({ pathname: `/todo/read/${tno}` });
  // };

  // const moveToList = () => {
  //   navigate({ pathname: "/todo/list" });
  // };

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">일정 수정</div>

      <ModifyComponent tno={tno} />
    </div>
  );
};

export default ModifyPage;
