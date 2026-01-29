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
