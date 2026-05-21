"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  {
    id: "home",
    label: "Trang chủ",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 9v12a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 001 1h5a1 1 0 001-1V9l-9-7z" />
      </svg>
    ),
  },
  {
    id: "discover",
    label: "Khám phá",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9l7.5-3.5L18 15l-7.5 3.5L7 11z" />
      </svg>
    ),
  },
  {
    id: "inbox",
    label: "Hộp thư",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Hồ sơ",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className={styles.navbar} id="main-navbar">
      <div className={styles.logo}>
        <div className={styles.logoIcon}>V</div>
        <span className={styles.logoText}>VidFlow</span>
      </div>

      <ul className={styles.navItems}>
        {navItems.slice(0, 2).map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ""
                }`}
              onClick={() => setActiveTab(item.id)}
              id={`nav-${item.id}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          </li>
        ))}

        <li className={styles.createBtnWrapper}>
          <button className={styles.createBtn} id="nav-create">
            <span className={styles.createBtnIcon}>+</span>
            <span className={styles.createBtnLabel}>Tạo video</span>
          </button>
        </li>

        {navItems.slice(2).map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.navItem} ${activeTab === item.id ? styles.active : ""
                }`}
              onClick={() => setActiveTab(item.id)}
              id={`nav-${item.id}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <button className={styles.createBtnDesktop} id="nav-create-desktop">
        <span className={styles.createBtnIcon}>+</span>
        <span className={styles.createBtnLabel}>Tạo video</span>
      </button>
    </nav>
  );
}
