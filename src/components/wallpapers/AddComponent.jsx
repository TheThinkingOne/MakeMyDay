import { useRef, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { useQueryClient } from "@tanstack/react-query";

const initState = {
  papertitle: "",
  files: [],
};

const AddComponent = () => {
  const [wallpaper, setWallpaper] = useState(initState);

  const uploadRef = useRef();

  const { moveToList } = useCustomMove();

  // Mutation 에 대해서 알기
  const addMutation = useMutation({
    mutationFn: (wallpaper) => postAdd(wallpaper),
  });

  const handleChangeWallpaper = (e) => {
    // 입력값 변경하는놈
    wallpaper[e.target.name] = e.target.value;
    setWallpaper({ ...wallpaper });
  };

  const handleClickAdd = (e) => {
    console.log(wallpaper);

    const formData = new FormData();

    const files = uploadRef.current.files;

    console.log(files);

    // 파일이 몇개 올라갔는지 확인가능
    console.log(files.length);

    // 상품정보 업로드 할때 전송되는 파일 정보들
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("papertitle", wallpaper.papertitle);
    //formData.append("pname", product.pname);
    console.log(formData);

    // setFetching(true);

    addMutation.mutate(formData);

    // useMutation 사용하면 아래 코드처럼 직접 호출 안해도 됨
    // postAdd(formData).then((data) => {
    //   setFetching(false);
    //   console.log("postAdd 서버응답값 : ", data);
    //   setResult(data.result); // 여기 data.RESULT 였는데 뭐가 맞는걸까
    // });
  };

  const queryClient = useQueryClient();

  const closeModal = () => {
    queryClient.resumePausedMutations("wallpapers/list");
    moveToList({ page: 1 }); // 리스트의 1페이지로 이동
    // 이런식으로 리스트 1페이지 이동하는 능력 같은걸 재사용하는 것이군
  };

  return;
};

export default AddComponent;
