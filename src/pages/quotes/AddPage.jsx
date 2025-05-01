// quotes Add Page
import React from "react";
import AddComponent from "../../components/quotes/AddComponent";

function AddPage(props) {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">명언 추가</div>

      <AddComponent />
      <br></br>

      <div className="text-2xl font-extrabold">명은은 모두에게 보입니다.</div>
      <div className="text-2xl font-extrabold">
        부적절한 글은 관리자가 삭제할 수 있습니다.
      </div>
    </div>
  );
}

export default AddPage;
