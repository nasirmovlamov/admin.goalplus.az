import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  CollectionIcon,
  DuplicateIcon,
  FilmIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ sidebarOutsideClick }: any) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => {
    setSidebarStatus(false);
  };

  const sidebarOpen = () => {
    setSidebarStatus(true);
  };

  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

  //if menu has chile menu then  use seperate array
  const childMenu = [
    {
      subMenuTitle: "child One",
      linkHref: "/",
    },
    {
      subMenuTitle: "child Two",
      linkHref: "/",
    },
    {
      subMenuTitle: "child Three",
      linkHref: "/",
    },
  ];

  useEffect(() => {
    if (sidebarOutsideClick) {
      setSidebarStatus(false);
    }
  }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <div className="inline-flex items-center justify-center ">
          {sidebarStatus ? (
            <ArrowNarrowLeftIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarClose}
            />
          ) : (
            <ArrowNarrowRightIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarOpen}
            />
          )}
        </div>

        <NavItem
          hrefLink="/sports"
          sidebarStatus={sidebarStatus}
          menuTitle="Sports"
          subMenu={false}
          subMenuArray={null}
        >
          <div className="w-[50px] h-[50px] flex items-center">
            <FontAwesomeIcon icon={faMedal} className="text-[40px] ml-2" />
          </div>
        </NavItem>
        {/* <NavItem
          hrefLink="/leagues"
          sidebarStatus={sidebarStatus}
          menuTitle="Leagues"
          subMenu={false}
          subMenuArray={null}
        >
          <div className="w-[50px] h-[50px] flex items-center">
            <FontAwesomeIcon icon={faTrophy} className="text-[40px] ml-2" />
          </div>
        </NavItem> */}
        <NavItem
          hrefLink="/users"
          sidebarStatus={sidebarStatus}
          menuTitle="Users"
          subMenu={false}
          subMenuArray={null}
        >
          <div className="w-[50px] h-[50px] flex items-center">
            <FontAwesomeIcon icon={faUser} className="text-[40px] ml-2" />
          </div>
        </NavItem>

        <NavItem
          hrefLink="/category"
          sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
          subMenuArray={null}
        >
          <CollectionIcon className="h-10" />
        </NavItem>

        <NavItem
          hrefLink="/sub-category"
          sidebarStatus={sidebarStatus}
          menuTitle="Sub-Category"
          subMenu={false}
          subMenuArray={null}
        >
          <DuplicateIcon className="h-10" />
        </NavItem>

        {/* this menu has child Menu     */}
        {/* <NavItem
          hrefLink="#"
          sidebarStatus={sidebarStatus}
          menuTitle="Chiled Menu"
          subMenu={true}
          subMenuArray={childMenu}
        >
          <FilmIcon className="h-10" />
        </NavItem> */}
      </nav>
    </>
  );
};

export default Nav;
