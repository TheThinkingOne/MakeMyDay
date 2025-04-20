import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteOne, postAdd } from "../../api/quotesApi";

// 이 코드는 미사용중인 것으로 되었따
const initState = {
  author: "",
  quotes: "",
};

// 여기는 삭제만 넣을것
function ManageComponent({ qno }) {
  const [quotes, setQuotes] = useState({ ...initState }); // 상태코드

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  // const handleClickAdd = () => {
  //   postAdd(quotes).then((result) => {
  //     setResult(result.qno);
  //     setQuotes({ ...initState });
  //   });
  // };

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  // 삭제는 관리자만 하도록 설정
  const handleClickDelete = () => {
    deleteOne(qno).then((data) => {
      console.log("해당 명언이 삭제되었습니다: " + data);
      setResult("삭제되었습니다.");
    });
  };
}

export default ManageComponent;
