import { NavLink } from "react-router-dom";
import { ProfileIcon } from "./ProfileIcon";

const SideBar = ({ user }) => {
  return (
    <div className="flex flex-col bg-[#eaf4fd] h-screen fixed rounded-lg justify-around p-1  w-[20%]">
      <div className="mb-3 flex flex-col w-full items-center justify-center">
        <ProfileIcon user={user.username} color={"red"} textColor={"white"} size={54}/>
        <h1 className="text-center font-bold uppercase mt-1">
          {user?.username}
        </h1>
        <h4 className="text-center text-gray-500">{user?.email}</h4>
      </div>
      <div className=" h-[50%] px-5">
        <nav>
          <ul className="flex flex-col gap-4">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-red-600 text-white"
                  : "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-gray-500 text-white"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/post"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-red-600 text-white"
                  : "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-gray-500 text-white"
              }
            >
              Post
            </NavLink>
            <NavLink
              to="/work"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-red-600 text-white"
                  : "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-gray-500 text-white"
              }
            >
              Work Out
            </NavLink>
            <NavLink
              to="/meal"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-red-600 text-white"
                  : "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-gray-500 text-white"
              }
            >
              Meal Plan
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-red-600 text-white"
                  : "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-gray-500 text-white"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/setting"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-red-600 text-white"
                  : "flex items-center rounded-lg w-full px-2 py-1 h-10 bg-gray-500 text-white"
              }
            >
              setting
            </NavLink>
          </ul>
        </nav>
      </div>
      <div className="flex ">
        <button
          className="bg-red-500 w-full text-white rounded p-2"
          onClick={() => {
            localStorage.removeItem("authUser");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default SideBar;
