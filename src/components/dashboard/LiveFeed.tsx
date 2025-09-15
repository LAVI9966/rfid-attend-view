import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock } from "lucide-react";

const LiveFeed = () => {
  const recentActivity = [
    {
      id: 1,
      name: "Alex Thompson",
      action: "Checked In",
      time: "2 minutes ago",
      status: "present"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      action: "Checked Out", 
      time: "5 minutes ago",
      status: "present"
    },
    {
      id: 3,
      name: "James Wilson",
      action: "Late Check In",
      time: "12 minutes ago", 
      status: "late"
    },
    {
      id: 4,
      name: "Emma Davis",
      action: "Checked In",
      time: "18 minutes ago",
      status: "present"
    },
    {
      id: 5,
      name: "Robert Chen",
      action: "Checked In",
      time: "25 minutes ago",
      status: "present"  
    },
    {
      id: 6,
      name: "Sophie Miller",
      action: "Late Check In", 
      time: "32 minutes ago",
      status: "late"
    }
  ];

  const getActionBadge = (action: string, status: string) => {
    if (action.includes("Late")) {
      return <Badge className="bg-late text-late-foreground text-xs">Late</Badge>;
    }
    if (action.includes("Out")) {
      return <Badge variant="outline" className="text-xs">Check Out</Badge>;
    }
    return <Badge className="bg-present text-present-foreground text-xs">Check In</Badge>;
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Live Activity Feed</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse ml-2"></div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 max-h-96 overflow-y-auto">
          {recentActivity.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-foreground text-sm">{activity.name}</p>
                  {getActionBadge(activity.action, activity.status)}
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveFeed;