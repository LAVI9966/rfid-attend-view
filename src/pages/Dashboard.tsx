import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import EmployeeList from "@/components/dashboard/EmployeeList";
import LiveFeed from "@/components/dashboard/LiveFeed";

const Dashboard = () => {
  return (
    <div className="min-h-screen animated-bg">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Statistics Cards with staggered animation */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <StatsCards />
        </div>

        {/* Main Content Grid with glass morphism */}
        <div className="grid gap-8 lg:grid-cols-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Employee List - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <EmployeeList />
          </div>
          
          {/* Live Activity Feed - Takes 1 column on large screens */}
          <div className="lg:col-span-1">
            <LiveFeed />
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="fixed top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="fixed bottom-1/4 right-10 w-40 h-40 bg-success/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      </main>
    </div>
  );
};

export default Dashboard;