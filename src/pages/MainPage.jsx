import React from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout.jsx";

// 여기 메인 페이지에 유저가 설정한 월페이퍼가 나오게 하자

function MainPage(props) {
  return (
    /* <div className={'text-3xl'}>

            <div className={'flex'}>
                <Link to = {'/about'}>Go to About Page</Link>
            </div>

            <div>MainPage</div>
        </div> */
    <BasicLayout>
      <div className={"text-3xl"}>Main Page</div>
    </BasicLayout>
  );
}

export default MainPage;
