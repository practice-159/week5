import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import type { loginType } from "../types/loginType";

const Login = ({
  axiosInstance,
  fetchProducts,
  setIsAuthenticated,
}: loginType) => {
  console.log("@ 執行 Login 元件");
  const [account, setAccount] = useState<{
    password: string;
    username: string;
  }>({
    username: "",
    password: "",
  });
  // week1 - 帳號密碼
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((preData) => {
      const { name, value } = e.target;
      return { ...preData, [name]: value };
    });
  };

  // week5
  const successNotify = (text: string) => {
    toast.success(text);
  };

  const errorNotify = (text: string) => {
    toast.error(text);
  };

  // week1 - 登入按鈕
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await axiosInstance.post(`/v2/admin/signin`, account);
      const { token, expired } = response.data;
      document.cookie = `someCookieName=${token}; expires=${new Date(expired)}`;
      // axiosInstance.defaults.headers.common["Authorization"] = token;
      successNotify(response.data.message);
      fetchProducts();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        errorNotify(error.response?.data.error.message);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleLoginSubmit(e);
      }}
    >
      <div className="form-group">
        {/* 帳號 */}
        <label htmlFor="username">Email address</label>
        <input
          type="email"
          id="username"
          name="username"
          className="form-control"
          value={account.username}
          placeholder="Enter email"
          aria-describedby="emailHelp"
          onChange={(e) => handleLoginInputChange(e)}
        />
      </div>
      <div className="form-group">
        {/* 密碼 */}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="form-control"
          value={account.password}
          onChange={(e) => handleLoginInputChange(e)}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        登入
      </button>
      <ToastContainer
        draggable
        rtl={false}
        pauseOnHover
        theme="colored"
        autoClose={3000}
        pauseOnFocusLoss
        newestOnTop={false}
        closeOnClick={false}
        position="bottom-right"
        hideProgressBar={false}
      />
    </form>
  );
};

export default Login;
