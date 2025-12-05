import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const location = useLocation();

  // Load token without causing render flicker
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Hook must run ALWAYS (no condition!)
  const navLinks = useMemo(() => {
    if (!isLoggedIn) {
      return [
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact", path: "/contact" },
      ];
    }
    return [
      { name: "Home", path: "/app" },
      { name: "Services", path: "/services" },
      { name: "Blogs", path: "/blogs" },
      { name: "Contact", path: "/contact" },
    ];
  }, [isLoggedIn]);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && path !== "/app" && location.pathname.startsWith(path));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    window.location.href = "/auth/login";
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-[999]
        bg-white/30 md:bg-white/20 
        backdrop-blur-xl border-b border-white/30 
        shadow-lg shadow-black/20
      "
    >
      {/* Placeholder prevents hook-order issues */}
      {isLoggedIn === null ? (
        <div className="h-16" />
      ) : (
        <>
          {/* Full navbar here */}
          <div className="container mx-auto px-4 relative z-[1000]">
            <div className="flex items-center h-16">
              {/* LOGO */}
              <Link
                to={isLoggedIn ? "/app" : "/"}
                className="flex items-center space-x-2 group flex-1"
              >
                <div className="
                  w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 
                  flex items-center justify-center shadow-xl shadow-blue-500/30 
                  border border-white/20 transition-transform duration-300 
                  group-hover:scale-110
                ">
                  <span className="text-white font-extrabold text-xl">RB</span>
                </div>
                <span className="font-semibold text-lg text-black">
                  RB Financial Consultancy
                </span>
              </Link>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex flex-1 justify-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium
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

              {/* DESKTOP AUTH */}
              <div className="hidden md:flex flex-1 justify-end relative">
                {!isLoggedIn ? (
                  <div className="flex gap-4">
                    <Link
                      to="/auth/login"
                      className="px-5 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className="px-5 py-2 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-white shadow-md flex items-center justify-center hover:scale-110"
                    >
                      <User size={20} />
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="
                            absolute right-0 top-14 w-48 bg-white/95 
                            backdrop-blur-xl rounded-xl shadow-xl border border-blue-100
                          "
                        >
                          <Link
                            to="/app/profile"
                            onClick={() => setProfileOpen(false)}
                            className="flex gap-2 px-4 py-3 hover:bg-blue-50 text-sm"
                          >
                            <User size={16} className="text-blue-600" /> Profile
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex gap-2"
                          >
                            <LogOut size={16} /> Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-white/20"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100 shadow-inner"
                >
                  <div className="py-4 px-4 space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`
                          block px-4 py-3 rounded-lg text-sm
                          ${
                            isActive(link.path)
                              ? "bg-blue-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-blue-50"
                          }
                        `}
                      >
                        {link.name}
                      </Link>
                    ))}

                    {!isLoggedIn ? (
                      <>
                        <Link
                          to="/auth/login"
                          onClick={() => setMenuOpen(false)}
                          className="block w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-center"
                        >
                          Login
                        </Link>

                        <Link
                          to="/auth/register"
                          onClick={() => setMenuOpen(false)}
                          className="block w-full px-4 py-3 rounded-lg border-2 border-blue-600 text-blue-600 text-center"
                        >
                          Sign Up
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/app/profile"
                          onClick={() => setMenuOpen(false)}
                          className="flex gap-2 px-4 py-3 rounded-lg hover:bg-blue-50 text-sm"
                        >
                          <User size={18} /> Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 rounded-lg bg-red-600 text-white text-sm flex justify-center gap-2"
                        >
                          <LogOut size={18} /> Logout
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
