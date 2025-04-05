import { useRef, useState } from "react";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOne, getOne, putOne } from "../../api/WallpaperApi";

const initState = {
  //
  ord: 0,
  papertitle: "",
  delFlag: false,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ModifyComponent = ({ ord }) => {
  // 기본 설정
  const [wallpaper, setWallpaper] = useState(initState);

  const [fetching, setFetching] = useState(false);

  const uploadRef = useRef();

  const { moveToList, moveToRead } = useCustomMove();

  const delMutation = useMutation({ mutationFn: (ord) => deleteOne(ord) });

  // 수정 mutation
  const modMutation = useMutation({
    mutationFn: (ord) => putOne(ord, wallpaper),
  });

  // 게시글 수정 중엔 fresh 안하게 막기
  const query = useQuery({
    queryKey: ["wallpapers", ord],
    queryFn: () => getOne(ord),
    staleTime: Infinity, // 이건 사실 상품 등록 중에 하는건데 이건 없어도 될지도(개인 관리라서)
  });

  useEffect(() => {
    if (query.isSuccess) {
      setWallpaper(query.data);
    }
  }, [ord, query.data, query.isSuccess]);

  const handleChangeProduct = (e) => {
    // 이건 ok
    // 입력값 변경하는놈
    wallpaper[e.target.name] = e.target.value;
    setWallpaper({ ...wallpaper });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = wallpaper.uploadFileNames.filter(
      // 이 부분의 로직 좀 더 이해할 필요 있음
      (fileName) => fileName !== imageName
    );

    wallpaper.uploadFileNames = resultFileNames;

    setWallpaper({ ...product });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // 수정 페이지에서 새로 넣는 상품 정보 투입
    formData.append("papertitle", wallpaper.papertitle);
    formData.append("delFlag", wallpaper.delFlag);

    // 기존에 있었던 파일도 유지한체로 보내줘야 함!! 이 부분이 중요
    for (let i = 0; i < wallpaper.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", wallpaper.uploadFileNames[i]);
    }

    setFetching(true);

    // 이 부분이 아마 수정창에서 이미지 넣었을 때 새로 나타나게 하는 부분인듯
    // mutation 사용할거라 필요 X
    // putOne(pno, formData).then((data) => {
    //   setResult("Modified");
    //   setFetching(false);
    // });

    // mutation 관련 modify(수정 코드)
    modMutation.mutate(formData);
  };

  const handleClickDelete = () => {
    delMutation.mutate(ord);
  };

  const queryClient = useQueryClient();

  const closeModal = () => {
    // 이 부분 다시 공부해야 할듯 동작 원리 아직 잘 몰겠음

    queryClient.invalidateQueries(["wallpapers", ord]);
    queryClient.invalidateQueries("wallpapers/list");
    if (delMutation.isSuccess) {
      moveToList(); // 삭제 되면 리스트 첫 페이지로 이동
    }

    if (modMutation.isSuccess) {
      moveToRead(ord); // 수정 되면 수정한 해당 게시글 보기로 이동
    }
  };

  return; // 이 부분에 프론트엔드 넣기
};

export default ModifyComponent;
