import React from "react";
import ReadComponent from "../../components/wallpapers/ReadComponent";

// 흠 근데 이게 필요한가 아냐 그냥 하자
function ReadPage(props) {
  const { ord } = useParams();
  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">배경화면 보기</div>
      <ReadComponent ord={ord}></ReadComponent>
    </div>
  );
}

export default ReadPage;
