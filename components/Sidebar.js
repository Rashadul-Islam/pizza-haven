import Link from "next/link";
import React, { useState } from "react";
import { FaTh, FaBars, FaRegUserCircle } from "react-icons/fa";
import { GiFullPizza, GiShoppingCart } from "react-icons/gi";
import { SiAddthis } from "react-icons/si";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useRouter } from "next/router";
import styles from "../styles/Sidebar.module.css";

const Sidebar = ({ child }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/addpizza",
      name: "Add Pizza",
      icon: <SiAddthis />,
    },
    {
      path: "/admin/managepizza",
      name: "Manage Pizza",
      icon: <GiFullPizza />,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: <GiShoppingCart />,
    },
    {
      path: "/logout",
      name: "Logout",
      icon: <RiLogoutCircleRLine />,
    },
  ];
  return (
    <div className={styles.container}>
      <div
        style={{ width: isOpen ? "200px" : "50px" }}
        className={styles.sidebar}
      >
        <div className={styles.top_section}>
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className={styles.logo}
          >
            Pizza-Haven
          </h1>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className={styles.bars}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            className={router.pathname === item.path ? styles.active : ""}
          >
            <Link href={item.path} passHref>
              <div className={styles.link}>
                <div className={styles.icon}>{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={styles.link_text}
                >
                  {item.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <main className={styles.main}>
        <div className={styles.sidebarHead}>
          <div className={styles.text}>
            <p>Hello, Admin</p>
            <p>Welcome to the board</p>
          </div>
          <div className={styles.adminImg}>
            <FaRegUserCircle />
          </div>
        </div>
        {child}
      </main>
    </div>
  );
};

export default Sidebar;
