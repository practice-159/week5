import type { AxiosInstance } from "axios";

export type loginType = {
  axiosInstance: AxiosInstance;
  fetchProducts: (e?: number) => Promise<void>;
  setIsAuthenticated: (value: React.SetStateAction<boolean>) => void;
};
