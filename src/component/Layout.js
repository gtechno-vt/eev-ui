import { Outlet, Link } from "react-router-dom";
import Header from "./inc/Header";
import Footer from "./inc/Footer";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
        </Suspense>
        <Footer />
      
    </>
  )
};

export default Layout;