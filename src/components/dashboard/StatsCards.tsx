import { Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCards = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "248",
      change: "+12 this month",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Present Today",
      value: "186",
      change: "75% attendance",
      icon: CheckCircle,
      color: "text-present",
      bgColor: "bg-present/10"
    },
    {
      title: "Absent Today",
      value: "42",
      change: "17% absent",
      icon: AlertCircle,
      color: "text-absent",
      bgColor: "bg-absent/10"
    },
    {
      title: "Late Arrivals",
      value: "20",
      change: "8% late today",
      icon: Clock,
      color: "text-late",
      bgColor: "bg-late/10"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;