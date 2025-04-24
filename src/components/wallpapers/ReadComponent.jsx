import { useQuery } from "@tanstack/react-query";
import { getOne } from "../../api/wallpaperApi";
import useCustomMove from "../../hooks/useCustomMove";

const initState = {
  ord: 0,
  papertitle: "",
  uploadFileNames: [],
};

const ReadComponent = ({ ord }) => {
  const { moveToList, moveToModify } = useCustomMove();

  const { data, isFetching } = useQuery({
    queryKey: ["wallpapers", ord],
    queryFn: () => getOne(ord),
    staleTime: 1000 * 10,
  });

  if (isFetching) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  const wallpaper = data || initState;

  return (
    <div className="p-6 border rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">배경화면 상세보기</h2>

      <div className="mb-4">
        <img
          src={`/api/view/${wallpaper.uploadFileNames[0]}`}
          alt="Wallpaper"
          className="w-full h-64 object-cover rounded"
        />
      </div>

      <div className="text-xl font-semibold mb-4">
        제목: {wallpaper.papertitle}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => moveToList({ page: 1 })}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          목록으로
        </button>
        <button
          onClick={() => moveToModify(wallpaper.ord)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default ReadComponent;
