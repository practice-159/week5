import { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, [navigate]);
  return (
    <>
      <h2>404 not found，5 秒後將導回首頁</h2>
    </>
  );
};

export default NotFound;
