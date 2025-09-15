import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap } from "lucide-react";

const EmployeeList = () => {
  const students = [
    {
      date: "2024-03-15",
      studentId: "STU001",
      studentName: "John Smith",
      status: "Present",
      inTime: "09:15 AM",
      outTime: "05:30 PM",
      remarks: "On time"
    },
    {
      date: "2024-03-15",
      studentId: "STU002", 
      studentName: "Sarah Johnson",
      status: "Present",
      inTime: "08:45 AM",
      outTime: "05:15 PM",
      remarks: "Early arrival"
    },
    {
      date: "2024-03-15",
      studentId: "STU003",
      studentName: "Mike Davis",
      status: "Late",
      inTime: "10:30 AM",
      outTime: "06:00 PM",
      remarks: "Traffic delay"
    },
    {
      date: "2024-03-15",
      studentId: "STU004",
      studentName: "Emily Wilson",
      status: "Absent",
      inTime: "-",
      outTime: "-",
      remarks: "Medical leave"
    },
    {
      date: "2024-03-15",
      studentId: "STU005",
      studentName: "David Brown",
      status: "Present",
      inTime: "09:00 AM",
      outTime: "05:30 PM",
      remarks: "Perfect attendance"
    },
    {
      date: "2024-03-15",
      studentId: "STU006",
      studentName: "Lisa Garcia",
      status: "Late",
      inTime: "09:45 AM",
      outTime: "05:45 PM",
      remarks: "Bus delay"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Present: { className: "bg-present text-present-foreground" },
      Late: { className: "bg-late text-late-foreground" }, 
      Absent: { className: "bg-absent text-absent-foreground" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Present;
    return (
      <Badge className={config.className}>
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <GraduationCap className="w-5 h-5" />
          <span>Student Attendance</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>In Time</TableHead>
              <TableHead>Out Time</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{student.date}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>{student.studentName}</TableCell>
                <TableCell>{getStatusBadge(student.status)}</TableCell>
                <TableCell>{student.inTime}</TableCell>
                <TableCell>{student.outTime}</TableCell>
                <TableCell className="text-muted-foreground">{student.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default EmployeeList;