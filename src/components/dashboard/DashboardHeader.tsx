import { Clock, Users, Calendar, Activity, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateSheetModal from "./UpdateSheetModal";

const DashboardHeader = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
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

  const handleSheetUpdate = () => {
    // This will trigger refresh of attendance data after modal saves
    window.location.reload(); // Simple refresh for now
  };

  return (
    <header className="relative overflow-hidden border-b border-border/50 backdrop-blur-xl">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-hero animate-gradient opacity-20"></div>
      
      {/* Glass overlay */}
      <div className="relative glass">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-primary rounded-2xl shadow-glow">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold font-inter bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Student Attendance
                  </h1>
                  <p className="text-lg text-muted-foreground font-medium">Real-time tracking dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8 text-muted-foreground">
                <div className="flex items-center space-x-3 bg-muted/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium">{currentDate}</span>
                </div>
                <div className="flex items-center space-x-3 bg-muted/20 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">Live: {currentTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Update Button */}
              <Button
                onClick={() => setIsUpdateModalOpen(true)}
                className="bg-gradient-primary text-white hover:opacity-90 shadow-glow transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Update Sheet
              </Button>
              
              <div className="relative">
                <div className="bg-gradient-success p-4 rounded-2xl shadow-success-glow animate-glow">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold text-lg">LIVE</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <p className="text-sm text-muted-foreground font-medium">System Status</p>
                <p className="font-bold text-xl text-foreground">Online</p>
                <p className="text-xs text-success font-medium">Real-time sync active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Sheet Modal */}
      <UpdateSheetModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        onUpdate={handleSheetUpdate}
      />
    </header>
  );
};

export default DashboardHeader;