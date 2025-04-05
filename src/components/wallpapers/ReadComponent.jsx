import { API_SERVER_HOST } from "../../api/todoApi";
import { getOne } from "../../api/WallpaperApi";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  ord: 0,
  papertitle: "",
  uploadFileNames: [], // 혹시 파일명이 달라서 그동안 파일이 깨져 보였던건가
};

const host = API_SERVER_HOST;

const ReadComponent = ({ ord }) => {
  const { moveToList, moveToModify, page, size } = useCustomMove();

  const { loginState } = useCustomLogin();

  const { data, isFetching } = useQuery({
    queryKey: ["products", ord], // 자바의 hashMap 같은건가
    queryFn: () => getOne(ord),
    staleTime: 1000 * 10, // 유통기한이라고 보면? => 10초동안 서버를 다시 호출하지 않음
    // 이렇게 해서 서버 리소스 아끼는거임
  });

  const wallpaper = data || initState;

  return;
};

export default ReadComponent;
