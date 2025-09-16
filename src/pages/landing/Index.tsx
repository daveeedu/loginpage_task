import { IuserAvatar } from "../../utils/icons.utils";
import Button from "../../components/customButton";
import { logout } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import config from "../../utils/config";

const { 
routes
} = config

export default function LandingPage() {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

  const user = localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser") as string)
    : null;

    const handleLogout = () => {
        dispatch(logout());
        navigate(routes.login);
    }
  return (
    <div className="flex flex-col md:gap-24 gap-10 justify-center items-center h-screen bg-[#F4F4F4]">
      <h2 className="text-center font-poppins text-[46px] font-medium mb-6 text-[#1C1B1F]">
        Welcome to <br />
        <span className="text-[48px] font-black leading-[136%] text-[#6358DC]">Unstop</span>
      </h2>
      <div className="border border-[#E2E2E2] rounded-[20px]  bg-white p-6 shadow-md w-xs ">
      <picture className="flex justify-center mb-6">
            <img
                src={user?.image || IuserAvatar}
                alt="User Avatar"
                className="w-30 h-30 rounded-full object-cover"
            />
        </picture>
        <div className="text-center font-inter text-base font-bold mb-4 text-[#6358DC]">
          {user?.fistName}{' '}{user?.lastName}
        </div>
        <div className="text-center font-inter text-xs font-medium mb-6 text-[#1C1B1F]">
          <p className="text-[#383838] mb-1">{user?.email}</p> 
          <p className="text-[#383838] capitalize">{user?.gender}</p> 
        </div>
        <div className="text-center text-md font-normal mb-2 text-[#1C1B1F]">
          <Button
          className="text-base font-inter font-medium w-7/12 m-auto bg-[#6358DC] border border-[#E2E2E2] text-white py-5 rounded-2xl flex items-center justify-center gap-2 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.05)] mt-8"
          text="Logout"
          onClick={handleLogout}
        />
        </div>
      </div>
    </div>
  );
};

