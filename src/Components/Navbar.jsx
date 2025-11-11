import { LogOut, Menu, Settings, User, X } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import axiosApiInstance from "../interceptor";

const Navbar = ({
  isAuthenticated: propIsAuthenticated,
  setIsAuthenticated: setPropIsAuthenticated,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logedIn =
    typeof window !== "undefined" ? localStorage.getItem("isLogedIn") : null;

  const handleLogout = async () => {
    try {
      const response = await axiosApiInstance.post("/api/v1/logout");
      if (response.status === 200) {
        localStorage.clear();
        if (typeof setPropIsAuthenticated === "function") {
          setPropIsAuthenticated(false);
        }
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const getUserName = () => {
    const studentUser = JSON.parse(localStorage.getItem("studentUser") || "{}");
    const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");
    return studentUser.name || adminUser.name || "User";
  };

  const isOnGuestPage = location.pathname === "/chat";
  const effectiveIsAuthenticated =
    typeof propIsAuthenticated === "boolean"
      ? propIsAuthenticated
      : logedIn === "true";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#2c2c3a] bg-zinc-950 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-bold text-[#f1f0ff]">InteliTalk</span>
          </Link>

          {/* Desktop Section */}
          <div className="hidden md:flex items-center space-x-4">
            {effectiveIsAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full hover:bg-[#1c1c27]"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={getUserName()} />
                      <AvatarFallback className="bg-[#2c2c3a] text-[#f1f0ff]">
                        {getUserName().charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-[#1c1c27] text-[#f1f0ff] border-[#2c2c3a]"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {getUserName()}
                      </p>
                      <p className="text-xs text-[#a78bfa]">
                        user@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#2c2c3a]" />
                  <DropdownMenuItem className="hover:bg-[#2c2c3a]">
                    <User className="mr-2 h-4 w-4 text-[#a78bfa]" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#2c2c3a]">
                    <Settings className="mr-2 h-4 w-4 text-[#a78bfa]" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#2c2c3a]" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-[#2c2c3a]"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-rose-400" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  asChild
                  className="text-white rounded hover:text-white hover:bg-[#1c1c27]"
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-500 hover:to-slate-600 text-white rounded"
                >
                  <Link to={isOnGuestPage ? "/chat" : "/chat"}>Guest</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#c7bdf5] hover:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t border-[#2c2c3a] mt-2 pt-2 pb-3 space-y-2 bg-[#12121a]"
            id="mobile-menu"
          >
            {effectiveIsAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full text-[#c7bdf5] hover:text-white hover:bg-[#1c1c27]"
                >
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-[#c7bdf5] hover:text-white hover:bg-[#1c1c27]"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4 text-rose-400" /> Log out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="w-full text-[#c7bdf5] hover:text-white hover:bg-[#1c1c27]"
                  asChild
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-[#6d28d9] to-[#9333ea] text-white hover:from-[#5b21b6] hover:to-[#7e22ce]"
                  asChild
                >
                  <Link to="/chat">Guest</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  setIsAuthenticated: PropTypes.func,
};

export default Navbar;
