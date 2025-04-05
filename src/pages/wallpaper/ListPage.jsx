import React from "react";
import ListComponent from "../../components/wallpapers/ListComponent";

function ListPage(props) {
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">배경화면 목록</div>
      <ListComponent />
    </div>
  );
}

export default ListPage;
