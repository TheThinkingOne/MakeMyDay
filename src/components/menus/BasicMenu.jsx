import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {
  const { loginState } = useCustomLogin();
  const isLogged = !!loginState?.userID;

  // 로그아웃 같은거 하면 상태 변화 감지해서 메뉴바 변경
  useEffect(() => {
    console.log("loginState 변경됨: ", loginState);
  }, [loginState]);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-2 z-50 bg-transparent">
      {/* 좌측 메뉴 */}
      <div className="flex space-x-3 ml-4 text-gray-800 font-extrabold text-2xl">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isLogged && (
          <>
            <Link to="/todo">나의 일정</Link>
            <Link to="/wallPaper">월페이퍼 관리</Link>
            {Array.isArray(loginState?.roleNames) &&
              loginState.roleNames.includes("ADMIN") && (
                <Link to="/quote/list">명언 관리</Link>
              )}
          </>
        )}
      </div>

      {/* 우측 메뉴 */}
      <div className="flex items-center space-x-2 mr-4 text-gray-800 text-lg">
        {isLogged ? (
          <>
            <Link to="/member/modify" className="underline">
              {loginState.userName}
            </Link>
            <Link to="/member/logout" className="underline">
              Logout
            </Link>
          </>
        ) : (
          <Link to="/member/login" className="underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BasicMenu;
