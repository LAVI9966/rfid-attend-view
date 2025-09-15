import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Zap } from "lucide-react";

interface ActivityItem {
  id: number;
  name: string;
  action: string;
  time: string;
  status: 'present' | 'late' | 'absent' | 'checkout';
}

const LiveFeed = () => {
  const recentActivity: ActivityItem[] = [
    { id: 1, name: "Aditi Sharma", action: "Checked In", time: "2 minutes ago", status: "present" },
    { id: 2, name: "Rahul Verma", action: "Checked Out", time: "5 minutes ago", status: "checkout" },
    { id: 3, name: "Priya Mehta", action: "Late Check In", time: "8 minutes ago", status: "late" },
    { id: 4, name: "Mohit Singh", action: "Checked In", time: "12 minutes ago", status: "present" },
    { id: 5, name: "Sneha Patel", action: "Marked Absent", time: "15 minutes ago", status: "absent" },
    { id: 6, name: "Arjun Kumar", action: "Checked In", time: "18 minutes ago", status: "present" },
    { id: 7, name: "Kavya Reddy", action: "Late Check In", time: "22 minutes ago", status: "late" },
    { id: 8, name: "Vikash Jain", action: "Checked Out", time: "25 minutes ago", status: "checkout" },
  ];

  const getActionBadge = (action: string, status: string) => {
    const statusConfig = {
      present: { 
        className: "bg-gradient-success text-white border-0 shadow-success-glow",
        icon: "✓"
      },
      checkout: { 
        className: "bg-gradient-primary text-white border-0 shadow-glow",
        icon: "↙"
      },
      late: { 
        className: "bg-gradient-warning text-white border-0 shadow-warning-glow",
        icon: "⏰"
      },
      absent: { 
        className: "bg-gradient-danger text-white border-0 shadow-danger-glow",
        icon: "✕"
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    return (
      <Badge className={`${config.className} font-semibold px-2 py-1 hover:scale-105 transition-transform duration-200 text-xs`}>
        <span className="mr-1">{config.icon}</span>
        <span>{action.includes("Late") ? "Late" : action.includes("Out") ? "Out" : action.includes("Absent") ? "Absent" : "In"}</span>
      </Badge>
    );
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <div className="w-2 h-2 bg-success rounded-full animate-pulse" />;
      case 'checkout':
        return <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />;
      case 'late':
        return <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />;
      case 'absent':
        return <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />;
      default:
        return <div className="w-2 h-2 bg-muted rounded-full" />;
    }
  };

  return (
    <Card className="glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-fit">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-glow/5 border-b border-border/30">
        <CardTitle className="flex items-center space-x-3 text-lg font-bold">
          <div className="relative">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse border-2 border-background" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Live Activity Feed
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <Zap className="w-3 h-3 text-success animate-pulse" />
              <span className="text-xs text-success font-medium">Real-time updates</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-primary/50">
          <div className="space-y-0">
            {recentActivity.map((activity, index) => (
              <div 
                key={activity.id}
                className="group relative p-4 border-b border-border/20 last:border-b-0 hover:bg-muted/5 transition-all duration-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline line */}
                {index !== recentActivity.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-border/50 to-transparent" />
                )}
                
                <div className="flex items-start space-x-4 relative">
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-primary-glow shadow-glow group-hover:scale-125 transition-transform duration-200" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary/20 animate-ping" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 text-sm">
                        {activity.name}
                      </p>
                      {getActionBadge(activity.action, activity.status)}
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{activity.time}</span>
                      {getActivityIcon(activity.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-r from-muted/10 to-muted/5 border-t border-border/30">
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="font-medium">Live feed • Updates every 30 seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveFeed;