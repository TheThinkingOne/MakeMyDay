import React from "react";
import ModifyComponent from "../../components/member/ModifyComponent";
import BasicLayout from "../../layouts/BasicLayout.jsx";

const ModifyPage = () => {
  return (
    <BasicLayout>
      <div className=" text-3xl">회원정보 변경하기</div>
      {""}
      <div className="bg-white w-full mt-4 p-2">
        <ModifyComponent />
      </div>
      {""}
    </BasicLayout>
  );
};

export default ModifyPage;
