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

  const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqQoZ7x8QfBiKS_LLk5gGwebfBmKWKAy5mO5DRBfsrkzSfqKRMtXsWMpSCQrTfADKd6hUXKDOy8Ss5/pub?output=csv";

  const parseCSV = (csvText: string): AttendanceRecord[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        date: values[0]?.trim() || '',
        studentId: values[1]?.trim() || '',
        studentName: values[2]?.trim() || '',
        status: values[3]?.trim() || '',
        inTime: values[4]?.trim() || '',
        outTime: values[5]?.trim() || '',
        remarks: values[6]?.trim() || ''
      };
    }).filter(record => record.studentId); // Filter out empty rows
  };

  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SHEETS_CSV_URL);
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      setStudents(parsedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setLoading(false);
    }
  };

  // Auto-refresh every 5 seconds for real-time updates
  useEffect(() => {
    fetchAttendanceData();
    const interval = setInterval(fetchAttendanceData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Present: { 
        className: "bg-gradient-success text-white border-0 shadow-success-glow font-semibold px-3 py-1",
        icon: "✓"
      },
      Late: { 
        className: "bg-gradient-warning text-white border-0 shadow-warning-glow font-semibold px-3 py-1",
        icon: "⏰"
      }, 
      Absent: { 
        className: "bg-gradient-danger text-white border-0 shadow-danger-glow font-semibold px-3 py-1",
        icon: "✕"
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.Present;
    return (
      <Badge className={`${config.className} hover:scale-105 transition-transform duration-200`}>
        <span className="mr-1">{config.icon}</span>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="group glass border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-primary-glow/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3 text-xl font-bold">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Student Attendance Registry
            </span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchAttendanceData}
            disabled={loading}
            className="glass border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group-hover:scale-105"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-300`} />
            <span className="font-medium">{loading ? 'Syncing...' : 'Refresh'}</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {loading && students.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="relative">
              <RefreshCw className="w-12 h-12 text-primary animate-spin" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-primary/20 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-foreground">Loading attendance data...</p>
              <p className="text-sm text-muted-foreground">Syncing with Google Sheets</p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-b-2xl">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="font-semibold text-foreground/80">Date</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Student ID</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Student Name</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                  <TableHead className="font-semibold text-foreground/80">In Time</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Out Time</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-16">
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-lg font-medium text-foreground">No attendance records found</p>
                          <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Make sure your Google Sheets is properly connected and contains valid data.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student, index) => (
                    <TableRow 
                      key={index} 
                      className="hover:bg-muted/10 transition-all duration-200 border-border/30 group"
                    >
                      <TableCell className="font-medium text-foreground/90 group-hover:text-foreground">
                        {student.date}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground group-hover:text-foreground/80">
                        {student.studentId}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {student.studentName}
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {student.inTime || '-'}
                      </TableCell>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {student.outTime || '-'}
                      </TableCell>
                      <TableCell className="text-muted-foreground group-hover:text-foreground/80 text-sm">
                        {student.remarks || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeList;