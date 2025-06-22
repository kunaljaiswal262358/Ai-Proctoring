import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { StatsPanel } from "../components/StatsPanel";

export const AdminLayout = ({ questions, exams, children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <Sidebar
          questions={questions}
          exams={exams}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <main className="flex-1 mt-4 md:mt-0">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden text-2xl mb-2 ml-2 opacity-85"
          >
            <i class="fa-solid fa-chart-bar"></i>
          </button>

          {children || <Outlet />}

          <StatsPanel questions={questions} exams={exams} />
        </main>
      </div>
    </div>
  );
};
