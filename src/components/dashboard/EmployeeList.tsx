import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, User } from "lucide-react";

const EmployeeList = () => {
  const employees = [
    {
      id: 1,
      name: "John Smith",
      department: "Engineering",
      checkIn: "09:15 AM",
      status: "present",
      hours: "7h 45m"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      department: "Marketing", 
      checkIn: "08:45 AM",
      status: "present",
      hours: "8h 15m"
    },
    {
      id: 3,
      name: "Mike Davis",
      department: "Sales",
      checkIn: "10:30 AM", 
      status: "late",
      hours: "6h 30m"
    },
    {
      id: 4,
      name: "Emily Wilson",
      department: "HR",
      checkIn: "-",
      status: "absent",
      hours: "0h 0m"
    },
    {
      id: 5,
      name: "David Brown",
      department: "Engineering",
      checkIn: "09:00 AM",
      status: "present", 
      hours: "8h 0m"
    },
    {
      id: 6,
      name: "Lisa Garcia",
      department: "Design",
      checkIn: "09:45 AM",
      status: "late",
      hours: "7h 15m"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      present: { variant: "default", className: "bg-present text-present-foreground" },
      late: { variant: "secondary", className: "bg-late text-late-foreground" }, 
      absent: { variant: "destructive", className: "bg-absent text-absent-foreground" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Employee Attendance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {employees.map((employee) => (
            <div 
              key={employee.id}
              className="flex items-center justify-between p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <p className="font-medium text-foreground">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">{employee.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Check-in: {employee.checkIn}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{employee.hours}</p>
                </div>
                
                {getStatusBadge(employee.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeList;