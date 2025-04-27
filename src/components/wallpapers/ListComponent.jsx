import { useQuery } from "@tanstack/react-query";
import { getList } from "../../api/wallpaperApi";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../common/PageComponent";
import { API_SERVER_HOST } from "../../api/todoApi";

API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDto: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToList, moveToRead, moveToRegister } =
    useCustomMove();

  const { data } = useQuery({
    queryKey: ["wallpapers/list", { page, size }],
    queryFn: () => getList({ page, size }),
    keepPreviousData: true,
    staleTime: 1000 * 30,
  });

  const serverData = data || initState;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {serverData.dtoList.map((wallpaper) => (
        <div
          key={wallpaper.ord}
          className="border p-2 cursor-pointer"
          onClick={() => moveToRead(wallpaper.ord)}
        >
          <img
            src={`${API_SERVER_HOST}/makemyday/wallpaper/view/${wallpaper.uploadFileNames[0]}`}
            alt="wallpaper"
            className="w-full h-48 object-cover mb-2"
          />
          <div className="text-center font-bold">{wallpaper.paperTitle}</div>
        </div>
      ))}

      <PageComponent serverData={serverData} movePage={moveToList} />

      <button
        onClick={() => moveToRegister()}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + 새 월페이퍼 작성
      </button>
    </div>
  );
};

export default ListComponent;
