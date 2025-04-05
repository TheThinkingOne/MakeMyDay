import React from "react";
import AddComponent from "../../components/wallpapers/AddComponent.jsx";

function AddPage(props) {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">배경화면 추가</div>
      <AddComponent />
    </div>
  );
}

export default AddPage;
