import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface AttendanceRecord {
  date: string;
  studentId: string;
  studentName: string;
  status: string;
  inTime: string;
  outTime: string;
  remarks: string;
}

const EmployeeList = () => {
  const [students, setStudents] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);

  // Replace this URL with your Google Sheets CSV export URL
  // Go to Google Sheets > File > Share > Publish to web > CSV format
  const GOOGLE_SHEETS_CSV_URL = "YOUR_GOOGLE_SHEETS_CSV_URL_HERE";

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      // This is where you'll connect to your Google Sheets
      // For now, using sample data - replace with actual Google Sheets integration
      
      // Example of how to fetch from Google Sheets CSV:
      // const response = await fetch(GOOGLE_SHEETS_CSV_URL);
      // const csvText = await response.text();
      // const parsedData = parseCSV(csvText);
      // setStudents(parsedData);

      // Sample data for demonstration - remove when connecting to Google Sheets
      setTimeout(() => {
        const sampleData: AttendanceRecord[] = [
          {
            date: new Date().toLocaleDateString(),
            studentId: "STU001",
            studentName: "John Smith",
            status: "Present",
            inTime: "09:15 AM",
            outTime: "05:30 PM",
            remarks: "On time"
          },
          {
            date: new Date().toLocaleDateString(),
            studentId: "STU002", 
            studentName: "Sarah Johnson",
            status: "Present",
            inTime: "08:45 AM",
            outTime: "-",
            remarks: "Still in class"
          }
        ];
        setStudents(sampleData);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setLoading(false);
    }
  };

  // Auto-refresh every 30 seconds for real-time updates
  useEffect(() => {
    fetchAttendanceData();
    const interval = setInterval(fetchAttendanceData, 30000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5" />
            <span>Student Attendance</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAttendanceData}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Updating...' : 'Refresh'}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading && students.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin mr-2" />
            <span>Loading attendance data...</span>
          </div>
        ) : (
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
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No attendance data found. Make sure your Google Sheets is connected properly.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{student.date}</TableCell>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{student.studentName}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{student.inTime}</TableCell>
                    <TableCell>{student.outTime}</TableCell>
                    <TableCell className="text-muted-foreground">{student.remarks}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeList;