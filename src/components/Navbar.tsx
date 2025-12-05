import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    window.location.href = "/auth/login";
  };

  // 🔥 Dynamic nav links based on login status
  const navLinks = isLoggedIn
    ? [
        { name: "Home", path: "/app" },
        { name: "Services", path: "/services" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact", path: "/contact" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact", path: "/contact" },
      ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && path !== "/app" && location.pathname.startsWith(path));

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
      {/* Top gradient blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-transparent pointer-events-none"></div>

      <div className="relative container mx-auto px-4 z-[1000]">
        <div className="flex items-center h-16">

          {/* LOGO */}
          <div className="flex-1">
            <Link to={isLoggedIn ? "/app" : "/"} className="flex items-center space-x-2 group">
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

              <span className="font-semibold text-lg text-black drop-shadow-lg">
                RB Financial Consultancy
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-white/40 hover:text-blue-600"
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP AUTH SECTION */}
          <div className="hidden md:flex flex-1 justify-end relative">

            {!isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* LOGIN BUTTON */}
                <Link
                  to="/auth/login"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-md"
                >
                  Login
                </Link>

                {/* SIGN UP BUTTON */}
                <Link
                  to="/auth/register"
                  className="px-5 py-2 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                {/* PROFILE BUTTON */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="
                    w-10 h-10 rounded-full 
                    bg-gradient-to-br from-blue-600 to-blue-400
                    text-white shadow-md hover:scale-110 transition
                    flex items-center justify-center
                  "
                >
                  <User size={20} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="
                        absolute right-0 top-14 w-48 
                        bg-white/95 backdrop-blur-xl 
                        rounded-xl shadow-xl 
                        border border-blue-100 overflow-hidden
                      "
                    >
                      <Link
                        to="/app/profile"
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-blue-50 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User size={16} className="text-blue-600" />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex-1 flex justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-white/20 transition"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100 shadow-inner overflow-hidden"
            >
              <div className="py-4 space-y-2 px-4">

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
                          : "text-gray-700 hover:bg-blue-50"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* MOBILE AUTH BUTTONS */}
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-center font-medium"
                    >
                      Login
                    </Link>

                    <Link
                      to="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-blue-600 text-blue-600 bg-white text-center font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/app/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50"
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;