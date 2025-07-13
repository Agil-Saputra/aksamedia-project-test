import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function AdminLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if device is mobile/tablet
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-mono">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <Navbar
        isMobile={isMobile}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${
          isMobile ? "ml-0" : "ml-64"
        } relative z-20`}
      >
        <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
          <main className="relative">
            {/* Content Background */}
            <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black dark:border-gray-300 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
              {/* Content Area */}
              <div className="p-4 sm:p-6 lg:p-8 relative z-10">{children}</div>

              {/* Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="h-2 bg-black dark:bg-gray-300"></div>
              </div>
            </div>
          </main>

          {/* Footer Grid Pattern */}
          <div className="mt-4 sm:mt-6 lg:mt-8 pt-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-gray-300"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-gray-300"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black dark:bg-gray-300"></div>
              <div className="h-px bg-black dark:bg-gray-300 flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
