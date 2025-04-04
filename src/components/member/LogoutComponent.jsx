import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

function LogoutComponent() {
  const { doLogout, moveToPath } = useCustomLogin();
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    doLogout();
    alert("로그아웃 되었습니다.");
    moveToPath("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="border-2 border-red-200 p-10 rounded shadow-md text-center">
        <h2 className="text-4xl font-extrabold text-orange-600-500 mb-8">
          아직 완료하지 않은 일정이 있는지 다시 확인해주세요
        </h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-xl font-bold py-3 px-6 rounded transition duration-300"
          onClick={handleClickLogout}
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default LogoutComponent;
