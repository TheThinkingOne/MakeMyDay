import React from "react";
import { useNavigate, Outlet } from "react-router-dom"; // Outlet 추가
import BasicLayout from "../../layouts/BasicLayout.jsx";

function IndexPage(props) {
  const navigate = useNavigate();

  return (
    <BasicLayout>
      <div className="text-black font-extrabold -mt=10">월페이퍼 관리</div>
      <div className="w-full flex m-2 p-2">
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={() => navigate("list")}
        >
          배경화면 목록
        </div>
        <div
          className="text-xl m-1 p-2 w-20 font-extrabold text-center underline"
          onClick={() => navigate("add")}
        >
          배경 추가
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet />
      </div>
    </BasicLayout>
  );
}

export default IndexPage;
