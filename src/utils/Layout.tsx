import { ReactNode } from "react";
import SideBar from "../components/Sidebar/SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return <SideBar>{children}</SideBar>;
};

export default Layout;
