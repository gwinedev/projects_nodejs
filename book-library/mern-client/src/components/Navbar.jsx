import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// react icons
import { FaBook } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isSticky, setisSticky] = useState(false);

  //   toggle menu
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setisSticky(true);
      } else {
        setisSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  //   Nav Items
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Shop", path: "/shop" },
    { link: "Sell Your Book", path: "/admin/dashboard" },
    { link: "Blog", path: "/blog" },
  ];
  return (
    <header>
      <nav>
        {/* Logo */}
        <Link
          to={"/"}
          className="text-2xl font-bold text-blue-700 flex items-center gap-2"
        >
          <FaBook className="inline-block" />
          Books
        </Link>

        {/* Nav items for large device */}

        <ul className="md:flex space-x-12 hidden">
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className="block text-base text-black uppercase cursor-pointer hover:text-blue-700"
            >
              {link}
            </Link>
          ))}
        </ul>
        {/* button for lg devices */}
        <div className="space-x-12 lg-flex items-center hidden">
          <button>
            <FaBarsStaggered className="w-5 hover:text-blue-700" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
