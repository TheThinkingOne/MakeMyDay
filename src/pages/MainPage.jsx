import React from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout.jsx";
import RandomWallpaperAndQuote from "../components/main/RandomWallpaperAndQuotes.jsx";

// 여기 메인 페이지에 유저가 설정한 월페이퍼가 나오게 하자

function MainPage(props) {
  return (
    <BasicLayout>
      <RandomWallpaperAndQuote />
    </BasicLayout>
  );
}

export default MainPage;
