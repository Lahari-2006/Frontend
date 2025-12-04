import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navLinks = [
    { name: "Home", path: "/app" },
    { name: "Services", path: "/app/services" },
    { name: "Blogs", path: "/app/blogs" },
    { name: "Contact", path: "/app/contact" },
  ];

  const isActive = (path) =>
  location.pathname === path ||
  (path !== "/app" && location.pathname.startsWith(path + "/"));


  return (
    <nav
      className="
      fixed top-0 left-0 right-0 
      z-[999] 
      bg-white/30 md:bg-white/20 
      backdrop-blur-xl 
      border-b border-white/30 
      shadow-lg shadow-black/20
      "
    >
      {/* Top gradient for visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent pointer-events-none"></div>

      <div className="relative container mx-auto px-4 z-[1000]">
        <div className="flex items-center h-16">

          {/* LOGO */}
          <div className="flex-1">
            <Link to="/app" className="flex items-center space-x-2 group">
              <div
                className="
                w-10 h-10 rounded-xl 
                bg-gradient-to-br from-blue-600 to-blue-400 
                flex items-center justify-center
                shadow-xl shadow-blue-500/30 
                border border-white/20 
                transition-transform duration-300 
                group-hover:scale-110
              "
              >
                <span className="text-white font-extrabold text-xl tracking-wide">
                  RB
                </span>
              </div>

              <span className="font-semibold text-lg text-Black drop-shadow-lg">
                RB Financial Consultancy
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-black shadow-lg scale-105"
                      : "text-blue/90 hover:bg-white/20 hover:text-white"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP PROFILE */}
          <div className="hidden md:flex flex-1 justify-center relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="
                w-10 h-10 rounded-full 
                bg-gradient-to-br from-blue-600 to-blue-400
                text-white shadow-md hover:scale-110 transition
              "
            >
              <User size={20} />
            </button>

            {/* PROFILE DROPDOWN */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute right-0 mt-12 w-48 
                    bg-white/95 backdrop-blur-xl 
                    rounded-xl shadow-xl 
                    border border-blue-100 overflow-hidden
                  "
                >
                  <Link
                    to="/app/profile"
                    className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-blue-50 transition"
                  >
                    <User size={16} className="text-blue-600" />
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-blue-50 transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex-1 flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/20 transition"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/20 backdrop-blur-xxl border-t border-white/30 shadow-inner"
          >
            <div className="py-4 space-y-2">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-3 rounded-lg text-sm font-medium transition
                    ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                        : "text-white/90 hover:bg-white/20"
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}

              {/* MOBILE PROFILE */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/app/profile";
                }}
                className="w-full px-4 py-3 rounded-lg text-sm text-white/90 hover:bg-white/20 flex items-center gap-2"
              >
                <User size={18} />
                Profile
              </button>

              {/* MOBILE LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
