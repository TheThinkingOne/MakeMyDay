import { useState, useRef, useEffect } from "react";
import { getOne, modifyOne, deleteOne } from "../../api/wallpaperApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { API_SERVER_HOST } from "../../api/todoApi";

const ModifyComponent = ({ ord }) => {
  const [wallpaper, setWallpaper] = useState(null);
  const [preview, setPreview] = useState(null); // 미리보기 상태 추가
  const [result, setResult] = useState(null);
  const uploadRef = useRef();
  const { moveToList, moveToRead } = useCustomMove();

  useEffect(() => {
    getOne(ord).then(setWallpaper);
  }, [ord]);

  const handleFileChange = () => {
    const file = uploadRef.current.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 설정
    }
  };

  const handleClickModify = async () => {
    const formData = new FormData();
    formData.append("paperTitle", wallpaper.paperTitle);

    const file = uploadRef.current.files[0];

    if (file) {
      // 새 파일이 있으면 기존 파일명은 넘기지 않음
      formData.append("files", file);
    } else {
      // 새 파일을 안 올렸다면 기존 파일 유지
      wallpaper.uploadFileNames.forEach((fileName) =>
        formData.append("uploadFileNames", fileName)
      );
    }

    await modifyOne(ord, formData);
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
          value={wallpaper.paperTitle} // 정확한 필드명 사용
          onChange={(e) =>
            setWallpaper({ ...wallpaper, paperTitle: e.target.value })
          }
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <h3>기존 사진</h3>
        <img
          src={`${API_SERVER_HOST}/makemyday/wallpaper/view/${wallpaper.uploadFileNames[0]}`}
          alt="current"
          className="w-full h-48 object-cover mb-2"
        />
      </div>

      <div className="mb-4">
        <h3>변경하려는 사진 (미리보기)</h3>
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover mb-2"
          />
        ) : (
          <p>이미지를 선택하세요.</p>
        )}
        <input
          type="file"
          ref={uploadRef}
          accept="image/*"
          onChange={handleFileChange}
        />
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
        <button
          onClick={() => moveToList({ page: 1 })}
          className="bg-gray-500 text-white p-2 rounded"
        >
          목록으로
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
