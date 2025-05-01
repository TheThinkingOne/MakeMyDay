import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { modifyMember } from "../../api/memberApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import ResultModal from "../common/ResultModal";

const ModifyComponent = () => {
  const loginInfo = useSelector((state) => state.loginSlice);
  const { moveToLogin } = useCustomLogin();

  const [member, setMember] = useState({
    userID: "",
    userName: "",
    password: "",
    confirmPassword: "",
    isSocial: false,
  });

  const [result, setResult] = useState();
  const [error, setError] = useState("");

  // ✅ loginInfo 가 세팅된 이후에만 member 정보 세팅
  useEffect(() => {
    if (loginInfo?.userID) {
      setMember({
        userID: loginInfo.userID,
        userName: loginInfo.userName,
        password: "",
        confirmPassword: "",
        isSocial: loginInfo.isSocial,
      });
    }
  }, [loginInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  // 사용자 회원정보 수정
  const handleClickModify = async () => {
    setError("");

    if (!member.isSocial) {
      if (member.password.length < 8) {
        setError("비밀번호는 8자 이상이어야 합니다.");
        return;
      }
      if (member.password !== member.confirmPassword) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    try {
      await modifyMember({
        userID: member.userID,
        userName: member.userName,
        password: member.isSocial ? null : member.password,
        isSocial: member.isSocial,
      });
      setResult("회원 정보가 수정되었습니다.");
    } catch (err) {
      setError(
        "회원정보 수정 실패: " + (err.response?.data?.MESSAGE || err.message)
      );
    }
  };

  // 모달창 닫고 로그인 페이지로 보내기(사용자 정보 변경 후에)
  const closeModal = () => {
    setResult(null);
    moveToLogin();
  };

  // ✅ 아직 loginInfo 가 세팅되지 않은 경우 로딩 표시
  if (!loginInfo?.userID) {
    return (
      <div className="text-center mt-10">🔄 사용자 정보를 불러오는 중...</div>
    );
  }

  return (
    <div className="mt-6">
      {result && (
        <ResultModal
          callbackFn={closeModal}
          title={"회원 정보 수정"}
          content={"회원정보 수정 완료. 다시 로그인 해주세요."}
        />
      )}

      {/* 로그인 아이디는 변경 비활성화 하자*/}
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">로그인 아이디</div>
          <input
            className="w-4/5 p-6 rounded-r border border-neutral-300 shadow-md bg-gray-100"
            name="userID"
            type="text"
            value={member.userID}
            readOnly
          />
        </div>
      </div>

      {!member.isSocial && (
        <>
          <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <div className="w-1/5 p-6 text-right font-bold">비밀번호</div>
              <input
                className="w-4/5 p-6 rounded-r border border-neutral-300 shadow-md"
                name="password"
                type="password"
                value={member.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
              <div className="w-1/5 p-6 text-right font-bold">
                비밀번호 확인
              </div>
              <input
                className="w-4/5 p-6 rounded-r border border-neutral-300 shadow-md"
                name="confirmPassword"
                type="password"
                value={member.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">닉네임</div>
          <input
            className="w-4/5 p-6 rounded-r border border-neutral-300 shadow-md"
            name="userName"
            type="text"
            value={member.userName}
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap justify-end">
          <button
            type="button"
            className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
            onClick={handleClickModify}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyComponent;
