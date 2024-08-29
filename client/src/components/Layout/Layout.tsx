import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
interface LayoutProps {
  children: ReactNode; // Указываем, что children будет типа ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout__wrapper}>
      <Header />
      <div className={styles.mainPage__wrapper}>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
