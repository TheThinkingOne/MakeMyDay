import { useQueryClient } from "@tanstack/react-query";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomMove from "../../hooks/useCustomMove";
import { getCookie } from "../../util/cookieUtil";

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
  const { moveToList, moveToRead, page, size, refresh } = useCustomMove();

  const { moveToLogin } = useCustomLogin();

  const { exceptionHandle } = useCustomLogin();

  const host = API_SERVER_HOST;

  const { data, isFetching, error, isError } = useQuery({
    // 이 부분에서 오류나는중 noQueryClient set 오류
    queryKey: ["wallpapers/list", { page, size, refresh }],
    // 이렇게하면 계속클릭했을때 서버가 계속 호출하는 부담 줄일수있음
    queryFn: () => getList({ page, size }),
    staleTime: 1000 * 60, // 60초동안은 동일페이지 클릭문제 꽤 해결
  });

  const queryClient = useQueryClient();

  const handleClickPage = (pageParam) => {
    // if (pageParam.page === parseInt(page)) {
    //   queryClient.invalidateQueries("products/list"); // 해당 경로의 쿼리를 모두 무효화 시킴
    // }

    moveToList(pageParam);
  };

  const serverData = data || initState;

  // 근데 리스트를 보는데 쿠키가 필요한가?
  const token = getCookie("member")?.accessToken;

  return;
};

export default ListComponent;
