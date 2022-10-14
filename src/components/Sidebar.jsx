import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
        {links.map((item) => (
            <NavLink
                key={item.name}
                to={item.to}
                className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-violet-500 text-sora"
                onClick={() => handleClick && handleClick()}
            >
                <item.icon className="w-6 h-6 mr-2" />
                {item.name}
            </NavLink>
        ))}
    </div>
);
const Sidebar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="md:flex hidden flex-col w-[200px] py-10 px-4 bg-[#000] rounded-lg">
                <img
                    src={logo}
                    alt="logo"
                    className=" h-8 object-contain self-start"
                />
                <NavLinks />
            </div>
            <div className="absolute md:hidden block top-6 right-3">
                {mobileMenuOpen ? (
                    <RiCloseLine
                        className="w-6 h-6 text-white mr-2"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                ) : (
                    <HiOutlineMenu
                        className="w-6 h-6 text-white mr-2"
                        onClick={() => setMobileMenuOpen(true)}
                    />
                )}
            </div>

            <div
                className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#000] backdrop-blur-lg z-10 p-6 md:hidden 
            smooth-transition ${mobileMenuOpen ? "left-0" : "-left-full"}`}
            >
                <img
                    src={logo}
                    alt="logo"
                    className=" h-10 object-contain self-start"
                />
                <NavLinks handleClick={() => setMobileMenuOpen(false)} />
            </div>
        </>
    );
};

export default Sidebar;
