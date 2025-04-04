// createAsyncthunk 로 로그인 유지

import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";

//
const host = `${API_SERVER_HOST}/makemyday/member`;

export const loginPost = async (loginParam) => {
  const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
  const form = new FormData();

  form.append("username", loginParam.userID); // 카카오는 이메일 안되니까 userID
  form.append("password", loginParam.password);

  const res = await axios.post(`${host}/login`, form, header);
  //
  return res.data;
};

export const modifyMember = async (member) => {
  const res = await axios.put(`${host}/modify`, member);

  return res.data;
};
