import { ChevronLeft, ChevronRight, Shield, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

const Sidebar = () => {
  const [ui, setUi] = useState({
    sidebarOpen: true,
    mobileMenuOpen: false,
    activeTab: "dashboard",
    searchTerm: "",
    sortBy: "name",
    sortOrder: "asc",
    currentPage: 1,
    itemsPerPage: 10,
    filterDepartment: "all",
    filterStatus: "all",
  });

  // UI update functions
  const updateUi = (updates) => {
    setUi((prev) => ({
      ...prev,
      ...updates,
      ...(updates.searchTerm !== undefined || updates.itemsPerPage !== undefined
        ? { currentPage: 1 }
        : {}),
    }));
  };

  {
    /* Sidebar */
  }
  <aside
    className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
         bg-gray-900/95 backdrop-blur-sm
          border-r border-gray-800/50
          shadow-xl lg:shadow-lg
          transition-all duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:m-4 lg:rounded-xl lg:h-[calc(100vh-2rem)]
          ${ui.mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          ${ui.sidebarOpen ? "w-64" : "w-16"}
          lg:${ui.sidebarOpen ? "w-64" : "w-16"}
        `}
  >
    {/* Sidebar Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50">
      {ui.sidebarOpen && (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">InteliTalk</span>
        </div>
      )}
      {!ui.sidebarOpen && (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md mx-auto">
          <Shield className="h-5 w-5 text-white" />
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => updateUi({ sidebarOpen: !ui.sidebarOpen })}
        className="hidden lg:flex p-1.5 h-auto hover:bg-gray-800"
      >
        {ui.sidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => updateUi({ mobileMenuOpen: false })}
        className="lg:hidden p-1.5 h-auto"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  </aside>;
};

export default Sidebar;
