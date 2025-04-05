import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./todoApi";

import axios from "axios";

const host = `${API_SERVER_HOST}/makemyday/wallpapers`;

// const host = `${API_SERVER_HOST}/makemyday/wallpapers`;

// 해당 월페이퍼의 저장글을 불러오는 것
export const getOne = async (ord) => {
  const res = await jwtAxios.get(`{host}/${ord}`);

  return res.data;
};

// 스프링의 WallpaperController 참고, 이와 연동함
export const getList = async (pageParam) => {
  const { page, size } = pageParam; // 구조분해 할당?

  const token = getCookie("wallpaper")?.accessToken; // 월페이퍼 불러오는데 쿠키가 필요할까?

  const headers = {
    // 이것도 필요할까?
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await jwtAxios.get(`${host}/list`, {
    params: { page: page, size: size },
  });

  return res.data;
};

// 월페이퍼 추가
export const postAdd = async (wallpaper) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.post(`${host}/`, wallpaper, header);

  return res.data;
};

// 월페이퍼 수정
export const putOne = async (ord, wallpaper) => {
  const header = { headers: { "Content-Type": "multipart/form-data" } };

  const res = await jwtAxios.put(`${host}/${ord}`, wallpaper, header);

  return res.data;
};

// 월페이퍼 삭제
export const deleteOne = async (ord) => {
  const res = await jwtAxios.delete(`${host}/${ord}`);

  return res.data;
};
