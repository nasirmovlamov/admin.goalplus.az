import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { authSlice } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import Navigate from "../Navigate";

const Layout = ({ children, title = "Sample Title" }: any) => {
  const dispatch = useAppDispatch();

  //console.log("layout", title)
  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);

  return (
    <>
      <Navigate>
        <Fragment>
          <Head>
            <title>{title}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="flex bg-gray-100 min-h-screen relative">
            <Sidebar mobileNavsidebar={mobileNavsidebar} />

            <div className="flex-grow text-gray-800">
              <Header
                mobileNavsidebar={mobileNavsidebar}
                setMobileNavsidebar={setMobileNavsidebar}
              />
              {children}
            </div>

            <Footer />
          </div>
        </Fragment>
      </Navigate>
    </>
  );
};

export default Layout;
