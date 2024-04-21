import { useEffect, useState } from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setAuthUser(user);
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  if (!authUser) return null;

  return (
    <div className="flex bg-white ">
      <div className=" p-2 ">
        <SideBar user={authUser} />
      </div>
      <div className="w-[80%] ml-[20%]  p-2 h-screen">{children}</div>
    </div>
  );
};
export default Layout;
