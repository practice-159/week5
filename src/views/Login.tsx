import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import type { loginType } from "../types/loginType";

import ReactToast from "../components/ReactToast";
import { errorNotify, successNotify } from "../utils/toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const Login = ({
  // axiosInstance,
  fetchProducts,
  setIsAuthenticated,
}: loginType) => {
  console.log("@ 執行 Login 元件");
  const navigate = useNavigate();
  const [account, setAccount] = useState<{
    password: string;
    username: string;
  }>({
    username: import.meta.env.VITE_EMAIL,
    password: import.meta.env.VITE_PASSWORD,
  });
  // week1 - 帳號密碼
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  // week1 - 登入按鈕
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axiosInstance.post(`/v2/admin/signin`, account);
      const { token, expired } = response.data;
      document.cookie = `someCookieName=${token}; expires=${new Date(expired)}`;
      // axiosInstance.defaults.headers.common["Authorization"] = token;
      // toast
      successNotify(response.data.message);
      // 跳轉回首頁
      setTimeout(() => {
        navigate("/");
      }, 5000);
      fetchProducts();
      // setIsAuthenticated(true);
    } catch (error) {
      // setIsAuthenticated(false);
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        errorNotify(error.response?.data.error.message);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-3">
          <form
            onSubmit={(e) => {
              handleLoginSubmit(e);
            }}
          >
            {/*  */}
            <div className="form-floating mb-3">
              <input
                type="email"
                id="username"
                name="username"
                className="form-control"
                value={account.username}
                placeholder="name@example.com"
                onChange={(e) => handleLoginInputChange(e)}
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={account.password}
                onChange={(e) => handleLoginInputChange(e)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {/*  */}

            <button type="submit" className="btn btn-primary mt-3">
              登入
            </button>
            <ReactToast />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
