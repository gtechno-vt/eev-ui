import { Outlet, Link } from "react-router-dom";
import Header from "./inc/Header";
import Footer from "./inc/Footer";
import { Suspense } from "react";

const Layout = () => {
  return (
    <>
        <Header />
        <Suspense fallback={<p style={{width:'100%',height:'calc(100vh - 101px)'}}>Loading...</p>}>
        <Outlet />
        </Suspense>
        <Footer />
      
    </>
  )
};

export default Layout;