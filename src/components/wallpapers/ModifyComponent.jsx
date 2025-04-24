import { useState, useRef, useEffect } from "react";
import { getOne, putOne, deleteOne } from "../../api/wallpaperApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const ModifyComponent = ({ ord }) => {
  const [wallpaper, setWallpaper] = useState(null);
  const [result, setResult] = useState(null);
  const uploadRef = useRef();
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(ord).then(setWallpaper);
  }, [ord]);

  const handleClickModify = async () => {
    const formData = new FormData();
    formData.append("papertitle", wallpaper.papertitle);

    const file = uploadRef.current.files[0];
    if (file) {
      formData.append("files", file);
    }

    wallpaper.uploadFileNames.forEach((fileName) =>
      formData.append("uploadFileNames", fileName)
    );

    await putOne(ord, formData);
    setResult("수정 완료");
  };

  const handleClickDelete = async () => {
    await deleteOne(ord);
    setResult("삭제 완료");
  };

  const closeModal = () => {
    if (result === "삭제 완료") {
      moveToList();
    } else {
      moveToRead(ord);
    }
  };

  if (!wallpaper) return <div>로딩 중...</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block font-bold mb-2">배경화면 제목</label>
        <input
          type="text"
          value={wallpaper.papertitle}
          onChange={(e) =>
            setWallpaper({ ...wallpaper, papertitle: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <img
          src={`/api/view/${wallpaper.uploadFileNames[0]}`}
          alt="current"
          className="w-full h-48 object-cover mb-2"
        />
        <input type="file" ref={uploadRef} accept="image/*" />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleClickModify}
          className="bg-blue-500 text-white p-2 rounded"
        >
          수정
        </button>
        <button
          onClick={handleClickDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          삭제
        </button>
      </div>

      {result && (
        <ResultModal
          title="처리 결과"
          content={result}
          callbackFn={closeModal}
        />
      )}
    </div>
  );
};

export default ModifyComponent;
