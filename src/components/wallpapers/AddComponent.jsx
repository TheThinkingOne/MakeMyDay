import React, { useRef, useState } from "react";
import { postAdd } from "../../api/wallpaperApi";
import { useMutation } from "@tanstack/react-query";
import ResultModal from "../common/ResultModal";
import useCustomMove from "../../hooks/useCustomMove";
import { showSuccess } from "../../util/toastUtil";

const initState = {
  papertitle: "",
};

const AddComponent = () => {
  const [wallpaper, setWallpaper] = useState(initState);
  const [result, setResult] = useState(null);
  const uploadRef = useRef();
  const { moveToList } = useCustomMove();

  const addMutation = useMutation({
    mutationFn: (formData) => postAdd(formData),
    onSuccess: (data) => {
      setResult(data);
      setWallpaper(initState);
      uploadRef.current.value = null;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWallpaper((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickAdd = () => {
    const file = uploadRef.current.files[0];
    if (!file) {
      alert("이미지를 하나 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);
    formData.append("papertitle", wallpaper.papertitle);

    addMutation.mutate(formData);
    showSuccess("월페이퍼가 등록되었습니다.");
  };

  const closeModal = () => {
    setResult(null);
    moveToList({ page: 1 });
  };

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          name="papertitle"
          value={wallpaper.papertitle}
          onChange={handleChange}
          placeholder="배경화면 제목"
          className="w-2/3 p-2 border rounded"
        />
      </div>
      <div className="flex justify-center mb-4">
        <input type="file" ref={uploadRef} accept="image/*" />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleClickAdd}
          className="rounded p-4 bg-blue-500 text-white"
        >
          등록
        </button>
      </div>

      {result && (
        <ResultModal
          title="등록 완료"
          content={`배경화면이 성공적으로 등록되었습니다.`}
          callbackFn={closeModal}
        />
      )}
    </div>
  );
};

export default AddComponent;
