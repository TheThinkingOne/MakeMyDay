import { useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { deleteOne, postAdd } from "../../api/quotesApi";

const initState = {
  author: "",
  quotes: "",
};

function AddComponent(props) {
  const [quotes, setQuotes] = useState({ ...initState }); // 상태코드

  const [result, setResult] = useState(null);

  const { moveToList } = useCustomMove();

  const handleClickAdd = () => {
    postAdd(quotes).then((result) => {
      setResult(result.qno);
      setQuotes({ ...initState });
    });
  };

  const closeModal = () => {
    setResult(null);
    moveToList();
  };

  // 삭제는 관리자만 하도록 설정
  const handleClickDelete = () => {
    deleteOne(qno).then((data) => {
      console.log("인용구가 삭제되었습니다: " + data);
      setResult("Deleted");
    });
  };
}
