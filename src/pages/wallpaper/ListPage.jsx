import React from "react";
import ListComponent from "../../components/wallpapers/ListComponent";
import { useNavigate } from "react-router-dom";

function ListPage(props) {
  const navigate = useNavigate();

  return (
    <div className="p-4 w-full bg-white">
      <div className="flex justify-between items-center mb-4">
        <div className="text-3xl font-extrabold">배경화면 목록</div>
      </div>
      <ListComponent />
    </div>
  );
}

export default ListPage;
