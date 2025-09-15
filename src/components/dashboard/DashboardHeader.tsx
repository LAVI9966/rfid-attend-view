import { Clock, Users, Calendar } from "lucide-react";

const DashboardHeader = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="bg-card border-b border-border p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Attendance Dashboard
            </h1>
            <div className="flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{currentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Live Time: {currentTime}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Live</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today's Overview</p>
              <p className="font-semibold text-foreground">Real-time Updates</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;