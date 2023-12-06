import { Outlet, Link } from "react-router-dom";
import Header from "./inc/Header";
import Footer from "./inc/Footer";

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
      
    </>
  )
};

export default Layout;