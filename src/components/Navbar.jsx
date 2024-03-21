import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { CustomButton } from "./";
import "./DropDown.css";
import { useAuth0} from "@auth0/auth0-react";
import { logo, menu, search, profile } from "../assets";
import { navlinks } from "../constants";


const Navbar = ({ setFilteredCampaigns, setIsLoading }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const { connect, address, contract, filterCampaignsByCategory } = useStateContext();

    const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSearchInputChange = async (event) => {
    const input = event.target.value;
    setIsLoading(true);
    try {
      const filteredCampaigns = await filterCampaignsByCategory(input);

      setFilteredCampaigns(filteredCampaigns);
    } catch (error) {
      console.error("Error filtering campaigns:", error);
    }
    setIsLoading(false);
  };


  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          id="searchInput"
          placeholder="Search for Category"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          onChange={handleSearchInputChange}
        />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) navigate("create-campaign");
            else connect();
          }}
        />

    <div className="flex items-center justify-end " 
    style={{
      transition: "transform 0.2s ease-in-out",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.2)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}>
      <div className="relative">
        <div onClick={toggleDropdown} className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={profile}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        
        {isDropdownVisible && ((address != "0x7179168617256D9531e1E78F447b8CeC591180f9" && address != "0x6842be9c4442392D2F7393146D1ce3Bf8c877668")) && (
          <div className="dropdown-menu">
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
              </div>
            )}

        {isDropdownVisible && ((address == "0x7179168617256D9531e1E78F447b8CeC591180f9" || address == "0x6842be9c4442392D2F7393146D1ce3Bf8c877668")) && (
          <div className="dropdown-menu">
            <Link to="/verifier-profile">Profile</Link>
            <Link to="/verifier-login">Verifier Login</Link>
          </div>
        )}
      </div>
    </div>
    </div>

    

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};



export default Navbar;
