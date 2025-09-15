import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import EmployeeList from "@/components/dashboard/EmployeeList";
import LiveFeed from "@/components/dashboard/LiveFeed";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Statistics Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Employee List - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <EmployeeList />
          </div>
          
          {/* Live Activity Feed - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <LiveFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;